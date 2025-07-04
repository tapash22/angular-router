import { Component, OnInit } from '@angular/core';
import { Project, User, UserInfoItem } from '../../interfaces/user';
import { ProjectCardComponent } from '../../component/childs/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import {
  faUser,
  faUserGear,
  faMapLocation,
  faMailBulk,
  faMobilePhone,
  faEdit,
  faCircleDot,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SectionCardComponent } from '../../component/childs/section-card/section-card.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormArray,
  Validators,
} from '@angular/forms';
// import toaster and use this
import { ToasterService } from '../../service/toaster.service';
import { ProjectScoreFormComponent } from '../../component/childs/project-score-form/project-score-form.component';
import { DynamicDialogComponent } from '../../component/dialog/dynamic-dialog/dynamic-dialog.component';
import { UserInfoFormComponent } from '../../component/childs/user-info-form/user-info-form.component';
import { UserService } from '../../service/user.service';
import { ProjectService } from '../../service/project.service';
import { ThemeService } from '../../service/core/theme.service';
import { DynamicButtonComponent } from '../../childs/dynamic-button/dynamic-button.component';
import { DynamicRatingStarComponent } from '../../childs/dynamic-rating-star/dynamic-rating-star.component';
import { DynamicProgressBarComponent } from '../../childs/dynamic-progress-bar/dynamic-progress-bar.component';
import { DisplayField, DisplayFieldWithIcon } from '../../interfaces/user';
import { DynamicSectionCardReadFieldComponent } from '../../childs/dynamic-section-card-read-field/dynamic-section-card-read-field.component';
import { UserProfileCardComponent } from '../../childs/user-profile-card/user-profile-card.component';

@Component({
  selector: 'app-profile',
  imports: [
    ProjectCardComponent,
    CommonModule,
    FontAwesomeModule,
    SectionCardComponent,
    DynamicDialogComponent,
    ProjectScoreFormComponent,
    ReactiveFormsModule,
    UserInfoFormComponent,
    DynamicButtonComponent,
    DynamicRatingStarComponent,
    DynamicProgressBarComponent,
    DynamicSectionCardReadFieldComponent,
    UserProfileCardComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userProfileData!: User;

//image
  image1 = './images/profile.jpg';

  profileForm!: FormGroup;
  projectScore!: FormGroup;

  selectedIndex: number | null = null;
  activeSection: string = 'basic';
  userInfoDialog: boolean = false;

  // project dialog show
  projectScoreDialog: boolean = false;
  // selected project
  selectedProject: Project | null = null;
  // selected project index
  selectedResourceIndex: number | null = null;

  color: string = 'bg-green-600';
  submitBtnTitle: string = 'submitBtnTitle';

  iconEdit = faEdit;
  iconCircle = faCircleDot;

  menuItems: any[] = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'projects', label: 'Projects' },
    { id: 'performance', label: 'Performance' },
  ];

  scrollToSection(id: string) {
    this.activeSection = id;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // define user data to show
  displayFields: DisplayField = {
    name: 'Name',
    email: 'Email',
    role: 'Role',
    department: 'Department',
    phone: 'Phone',
    location: 'Location',
  };

  displayFieldsWithIcon: DisplayFieldWithIcon = {
    name: { label: 'Name', icon: this.image1 },
    role: { label: 'Role', icon: faUserGear },
    email: { label: 'Email', icon: faMailBulk },
    phone: { label: 'Phone', icon: faMobilePhone },
    location: { label: 'Location', icon: faMapLocation },
  };

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private toaster: ToasterService,
    public themeService: ThemeService
  ) {
    this.userProfileData = this.userService.getCurrentUser()!;
  }

  ngOnInit() {
    // ✅ Load the current user from localStorage via userService
    this.userProfileData = this.userService.getCurrentUser()!;

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
    return this.projectScore.get('working_resource_scores') as FormArray;
  }

  get userInfoList(): UserInfoItem[] {
    return this.buildUserInfoList(this.displayFields);
  }

  get userInfoListWithIcon(): UserInfoItem[] {
    return this.buildUserInfoList(this.displayFieldsWithIcon);
  }

  private buildUserInfoList(
    fields: DisplayField | DisplayFieldWithIcon
  ): UserInfoItem[] {
    return Object.entries(fields)
      .map(([key, value]) => {
        const userValue = this.userProfileData?.[key as keyof User];

        if (typeof userValue === 'string' || typeof userValue === 'number') {
          if (typeof value === 'string') {
            // displayFields case
            return { label: value, value: userValue };
          } else {
            // displayFieldsWithIcon case
            return {
              label: value.label,
              value: userValue,
              icon: value.icon,
            };
          }
        }

        return null;
      })
      .filter((item): item is UserInfoItem => item !== null);
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
      'working_resource_scores'
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

    const success = this.userService.updateUserProfile(updatedFields);
    console.log('show', success);

    if (success) {
      this.userProfileData = this.userService.getCurrentUser()!;

      this.toaster.showToast(
        'Your porfile data updated successfully!',
        'success'
      );
      console.log(this.userService.getCurrentUser());
    } else {
      this.toaster.showToast('Failed to update profile.', 'error');
    }

    this.userInfoDialog = false;
  }

  //update project resource score
  submitProjectScoreUpdate() {
    if (!this.projectScore.valid || !this.selectedProject) {
      this.toaster.showToast('Invalid data or no project selected', 'error');
      return;
    }

    const scores = this.projectScore.value.working_resource_scores;

    console.log(scores);

    let allSuccess = true;

    for (let i = 0; i < scores.length; i++) {
      const resource = scores[i];
      const success = this.projectService.updateUserProjectResourceScore(
        this.selectedProject.id,
        resource.id,
        +resource.performance_score
      );

      if (!success) allSuccess = false;
    }

    if (allSuccess) {
      this.userProfileData = this.userService.getCurrentUser()!;
      this.toaster.showToast(
        'Performance scores updated successfully!',
        'success'
      );

      console.log(this.userProfileData);
    } else {
      this.toaster.showToast(
        'Failed to update some performance scores.',
        'error'
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
