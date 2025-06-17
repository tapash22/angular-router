import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth/auth.service";
import { Project, User } from "../../interfaces/user";
import { ProjectCardComponent } from "../../component/childs/project-card/project-card.component";
import { CommonModule } from "@angular/common";
import {
  faUser,
  faUserGear,
  faMapLocation,
  faMailBulk,
  faMobilePhone,
  faEdit,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import { filter } from "rxjs";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faStar as solidStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { SectionCardComponent } from "../../component/childs/section-card/section-card.component";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormArray,
  Validators,
} from "@angular/forms";
// import toaster and use this
import { ToasterService } from "../../service/toaster.service";
import { ProjectScoreFormComponent } from "../../component/childs/project-score-form/project-score-form.component";
import { DynamicDialogComponent } from "../../component/dialog/dynamic-dialog/dynamic-dialog.component";
import { UserInfoFormComponent } from "../../component/childs/user-info-form/user-info-form.component";

type StarType = "full" | "half" | "empty";

@Component({
  selector: "app-profile",
  imports: [
    ProjectCardComponent,
    CommonModule,
    FontAwesomeModule,
    SectionCardComponent,
    DynamicDialogComponent,
    ProjectScoreFormComponent,
    ReactiveFormsModule,
    UserInfoFormComponent,
  ],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent {
  userProfileData!: User;

  profileForm!: FormGroup;
  projectScore!: FormGroup;

  selectedIndex: number | null = null;
  activeSection: string = "basic";
  userInfoDialog: boolean = false;

  // project dialog show
  projectScoreDialog: boolean = false;
  // selected project
  selectedProject: Project | null = null;
  // selected project index
  selectedResourceIndex: number | null = null;

  color: string = "bg-green-600";
  submitBtnTitle: string = "submitBtnTitle";

  solidStar = solidStar;
  halfStar = faStarHalfAlt;

  iconUser = faUser;
  iconUserRole = faUserGear;
  iconMail = faMailBulk;
  iconPhone = faMobilePhone;
  iconLocation = faMapLocation;
  iconEdit = faEdit;
  iconCircle = faCircleDot;

  ratingStars: StarType[] | null = [];

  menuItems: any[] = [
    { id: "basic", label: "Basic Info" },
    { id: "projects", label: "Projects" },
    { id: "performance", label: "Performance" },
  ];

  scrollToSection(id: string) {
    this.activeSection = id;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toaster: ToasterService
  ) {
    this.userProfileData = this.authService.getCurrentUser()!;
    this.generateStars(this.userProfileData.rating!);
  }

  ngOnInit() {
    // ✅ Load the current user from localStorage via AuthService
    this.userProfileData = this.authService.getCurrentUser()!;

    // ✅ Initialize the user basic info
    this.profileForm = this.fb.group({
      name: [{ value: this.userProfileData.name, disabled: true }],
      email: [this.userProfileData.email],
      phone: [this.userProfileData.phone],
      location: [this.userProfileData.location],
    });

    this.projectScore = this.fb.group({
      working_resource_scores: this.fb.array([]),
    });
  }

  get workingResourceScores(): FormArray {
    return this.projectScore.get("working_resource_scores") as FormArray;
  }

  //use star calculation
  private generateStars(rating: number | null | undefined): void {
    if (rating == null || isNaN(rating)) {
      this.ratingStars = Array<StarType>(5).fill("empty");
      return;
    }
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    this.ratingStars = [
      ...Array<StarType>(full).fill("full"),
      ...Array<StarType>(half).fill("half"),
      ...Array<StarType>(empty).fill("empty"),
    ];
  }
  //projecct active with added style
  handleProject(event: { index: number; project: Project }) {
    this.selectedIndex = event.index;
  }

  //open user info dialog
  editUserInfo() {
    this.userInfoDialog = true;
  }

  //open project score dialog
  openPerformanceScoreDialog(project: Project) {
    this.selectedProject = project;

    const workingResources = project.working_resource;

    const formArray = this.projectScore.get(
      "working_resource_scores"
    ) as FormArray;
    formArray.clear();

    workingResources.forEach((resource) => {
      formArray.push(
        this.fb.group({
          id: [resource.id],
          name: [resource.name],
          performance_score: [
            resource.performance_score,
            [Validators.required, Validators.min(0), Validators.max(100)],
          ],
        })
      );
    });

    this.projectScoreDialog = true;
  }

  //update user basic info
  updateUser() {
    const updatedFields = this.profileForm.getRawValue();

    const success = this.authService.updateUserProfile(updatedFields);
    console.log("show", success);

    if (success) {
      this.userProfileData = this.authService.getCurrentUser()!;

      this.toaster.showToast(
        "Your porfile data updated successfully!",
        "success"
      );
    } else {
      this.toaster.showToast("Failed to update profile.", "error");
    }

    this.userInfoDialog = false;
  }

  //update project resource score
  submitProjectScoreUpdate() {
    if (!this.projectScore.valid || !this.selectedProject) {
      this.toaster.showToast("Invalid data or no project selected", "error");
      return;
    }

    const scores = this.projectScore.value.working_resource_scores;

    let allSuccess = true;

    for (let i = 0; i < scores.length; i++) {
      const resource = scores[i];
      const success = this.authService.updateUserProjectResourceScore(
        this.selectedProject.id,
        resource.id,
        +resource.performance_score
      );

      if (!success) allSuccess = false;
    }

    if (allSuccess) {
      this.userProfileData = this.authService.getCurrentUser()!;
      this.toaster.showToast(
        "Performance scores updated successfully!",
        "success"
      );

      console.log(this.userProfileData);
    } else {
      this.toaster.showToast(
        "Failed to update some performance scores.",
        "error"
      );
    }

    this.projectScoreDialog = false;
  }

  //close dilaog
  closeDialog() {
    if (this.userInfoDialog === true) this.userInfoDialog = false;
    if (this.projectScoreDialog === true) this.projectScoreDialog = false;
  }
}
