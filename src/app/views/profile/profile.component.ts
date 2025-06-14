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
import { DynamicDialogComponent } from "../../component/dialog/dynamic-dialog/dynamic-dialog.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
// import toaster and use this
import { ToasterService } from "../../service/toaster.service";

type StarType = "full" | "half" | "empty";

@Component({
  selector: "app-profile",
  imports: [
    ProjectCardComponent,
    CommonModule,
    FontAwesomeModule,
    SectionCardComponent,
    DynamicDialogComponent,
    ReactiveFormsModule,
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
  projectScoreDialog: boolean = false;
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

    // ✅ Initialize the user basic info
    // this.projectScore = this.fb.group({
    //   email: [this.userProfileData.projects.],
    //   phone: [this.userProfileData.phone],
    //   location: [this.userProfileData.location],
    // });
  }

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

  handleProject(event: { index: number; project: Project }) {
    this.selectedIndex = event.index;
  }

  editUserInfo() {
    this.userInfoDialog = true;
  }
  editSingleProjectPerformScore() {
    this.projectScoreDialog = true;
  }

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

  closeDialog() {
    if (this.userInfoDialog === true) this.userInfoDialog = false;
    if (this.projectScoreDialog === true) this.projectScoreDialog = false;
  }
}
