import { Component, OnInit } from '@angular/core';
import { Project, User, UserInfoItem } from '../../interfaces/user';
import { ProjectCardComponent } from '../../component/childs/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { faEdit, faCircleDot } from '@fortawesome/free-solid-svg-icons';
import {
  combineLatest,
  filter,
  forkJoin,
  map,
  Observable,
  of,
  take,
} from 'rxjs';
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
import { DynamicButtonComponent } from '../../childs/dynamic-button/dynamic-button.component';
import { DynamicRatingStarComponent } from '../../childs/dynamic-rating-star/dynamic-rating-star.component';
import { DynamicProgressBarComponent } from '../../childs/dynamic-progress-bar/dynamic-progress-bar.component';
import { DisplayField, DisplayFieldWithIcon } from '../../interfaces/user';
import {
  displayFields,
  menuItems,
  displayFieldsWithIcon,
} from '../../localStore/user-data';
import { DynamicSectionCardReadFieldComponent } from '../../childs/dynamic-section-card-read-field/dynamic-section-card-read-field.component';
import { UserProfileCardComponent } from '../../childs/user-profile-card/user-profile-card.component';
import { MenuListComponent } from '../../childs/menu-list/menu-list.component';

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
    UserProfileCardComponent,
    MenuListComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  // icon usage
  iconEdit = faEdit;
  iconCircle = faCircleDot;

  // Tailwind indicator color
  color: string = 'bg-green-600';

  //  Menu
  menuItems = menuItems;
  activeSection: string = 'basic';
  collapsed = true;

  // Form controls
  profileForm!: FormGroup;
  projectScore!: FormGroup;
  projectResource!: FormGroup;

  // Dialogs
  userInfoDialog: boolean = false;
  projectResourceDialog: boolean = false;

  // Selection state
  selectedIndex: number | null = null;
  selectedProject: Project | null = null;
  selectedResourceIndex: number | null = null;

  //  Static field config
  displayFields$ = of(displayFields);
  displayFieldsWithIcon$ = of(displayFieldsWithIcon);

  // User observable
  userProfileData$!: Observable<User | null>;

  //  Derived user info lists
  userInfoList$!: Observable<UserInfoItem[]>;
  userInfoListWithIcon$!: Observable<UserInfoItem[]>;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    // ✅ Load the current user from localStorage via userService
    this.userProfileData$ = this.userService.currentUser$;

    // ✅ Initialize the user basic info
    this.userProfileData$.pipe(take(1)).subscribe((user) => {
      this.profileForm = this.fb.group({
        name: [{ value: user?.name, disabled: true }],
        email: [user?.email],
        phone: [user?.phone],
        location: [user?.location],
      });
    });

    this.projectScore = this.fb.group({
      working_resource_scores: this.fb.array([]),
    });

    // ✅ Build user info lists
    this.userInfoList$ = combineLatest({
      user: this.userProfileData$,
      fields: this.displayFields$,
    }).pipe(map(({ user, fields }) => this.buildUserInfoList(user, fields)));

    this.userInfoListWithIcon$ = combineLatest({
      user: this.userProfileData$,
      fields: this.displayFieldsWithIcon$,
    }).pipe(map(({ user, fields }) => this.buildUserInfoList(user, fields)));
  }

  get workingResourceScores(): FormArray {
    return this.projectScore.get('working_resource_scores') as FormArray;
  }

  private buildUserInfoList(
    userData: User | null,
    fields: DisplayField | DisplayFieldWithIcon
  ): UserInfoItem[] {
    return Object.entries(fields)
      .map(([key, value]) => {
        const userValue = userData?.[key as keyof User];

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
  openPerformanceScoreDialog(event: { index: number; project: Project }) {
    this.selectedProject = event.project;

    const workingResources = event.project.working_resource;

    const formArray = this.workingResourceScores;
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

    this.projectResourceDialog = true;
  }

  addedProjectResourceInfo(project: Project): void {
    this.selectedProject = project;
    this.selectedResourceIndex = -1;

    this.projectResource = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      time_spent_hours: [0, [Validators.required, Validators.min(0)]],
      performance_score: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });

    this.projectResourceDialog = true;
  }

  // resource update dialog open
  updateProjectResourceInfo(event: { project: Project; resource: any }) {
    const { project, resource } = event;

    this.selectedProject = project;
    this.selectedResourceIndex = resource.id;

    this.projectResource = this.fb.group({
      id: [resource.id],
      name: [resource.name, [Validators.required]],
      email: [resource.email, [Validators.required, Validators.email]],
      time_spent_hours: [
        resource.time_spent_hours,
        [Validators.required, Validators.min(0)],
      ],
      performance_score: [
        resource.performance_score,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });

    this.projectResourceDialog = true;
  }

  // delete resource
  deleteProjectResourceInfo(event: { project: Project; resource: any }) {
    const { project, resource } = event;

    if (!project || !resource) {
      this.toaster.showToast('Invalid project or resource data.', 'error');
      return;
    }

    this.projectService
      .userProjectResource(project.id, resource.id, { remove: true })
      .subscribe({
        next: (success) => {
          this.toaster.showToast(
            success
              ? 'Resource deleted successfully!'
              : 'Failed to delete resource.',
            success ? 'success' : 'error'
          );
        },
        error: () => {
          this.toaster.showToast('Unexpected error during deletion.', 'error');
        },
      });
  }

  //update project resource score
  submitProjectScoreUpdate(): void {
    if (
      this.projectResource &&
      this.projectResource.valid &&
      this.selectedProject
    ) {
      // Single Resource Add or Update
      const resourceValue = this.projectResource.getRawValue();

      // If id is -1 or falsy, treat as new resource (id assigned in service)
      const resourceId =
        resourceValue.id && resourceValue.id > 0 ? resourceValue.id : -1;

      this.projectService
        .userProjectResource(this.selectedProject.id, resourceId, {
          name: resourceValue.name,
          email: resourceValue.email,
          time_spent_hours: +resourceValue.time_spent_hours,
          performance_score: +resourceValue.performance_score,
        })
        .subscribe({
          next: (success) => {
            this.toaster.showToast(
              success
                ? resourceId === -1
                  ? 'Resource added successfully!'
                  : 'Resource updated successfully!'
                : 'Failed to update resource.',
              success ? 'success' : 'error'
            );
            if (success) this.projectResourceDialog = false;
          },
          error: () => {
            this.toaster.showToast('Unexpected error while updating.', 'error');
          },
        });
    } else if (
      this.projectScore &&
      this.projectScore.valid &&
      this.selectedProject
    ) {
      // ✅ Multiple Resource Bulk Update
      const scores = this.projectScore.value.working_resource_scores;

      const updateObservables: Observable<boolean>[] = scores.map(
        (resource: any) =>
          this.projectService.userProjectResource(
            this.selectedProject!.id,
            resource.id,
            {
              email: resource.email,
              time_spent_hours: +resource.time_spent_hours,
              performance_score: +resource.performance_score,
            }
          )
      );

      forkJoin(updateObservables).subscribe((results: boolean[]) => {
        const allSuccess = results.every(Boolean);

        this.toaster.showToast(
          allSuccess
            ? 'All resources updated successfully!'
            : 'Some resources failed to update.',
          allSuccess ? 'success' : 'error'
        );

        this.projectResourceDialog = false;
      });
    } else {
      this.toaster.showToast('Invalid data or no project selected', 'error');
    }
  }

  //update user basic info
  updateUser(): void {
    const updatedFields = this.profileForm.getRawValue();

    this.userService.updateUserProfile(updatedFields).subscribe((success) => {
      if (success) {
        this.toaster.showToast(
          'Your profile data updated successfully!',
          'success'
        );
      } else {
        this.toaster.showToast('Failed to update profile.', 'error');
      }

      this.userInfoDialog = false;
    });
  }

  //close dilaog
  closeDialog() {
    // if (this.userInfoDialog === true) this.userInfoDialog = false;
    // if (this.projectScoreDialog === true) this.projectScoreDialog = false;
    this.userInfoDialog = false;
    this.projectResourceDialog = false;
  }

  deleteProject(event: { index: number }) {
    this.selectedIndex = event.index ;

    this.projectService.deleteProject(this.selectedIndex).subscribe({
      next: () => {
        this.toaster.showToast('Your project delete successfully!', 'success');
      },
      error: (err) => {
        this.toaster.showToast('There some issue try again later', 'error');
      },
    });
  }
}
