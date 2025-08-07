import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjectCardComponent } from '../../component/childs/project-card/project-card.component';
import { Project, User } from '../../interfaces/user';
import { MOCK_USERS } from '../../localStore/user-data';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { DynamicDialogComponent } from '../../component/dialog/dynamic-dialog/dynamic-dialog.component';
import { FieldSchema } from '../../interfaces/form-field-schema';
import { UserService } from '../../service/user.service';
import { ProjectService } from '../../service/project.service';
import { ChildLayoutComponent } from '../../layout/child-layout/child-layout.component';
import { ToasterService } from '../../service/toaster.service';
import { ProjectFormComponent } from '../../component/childs/project-form/project-form.component';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-work',
  imports: [
    CommonModule,
    FontAwesomeModule,
    ProjectCardComponent,
    ReactiveFormsModule,
    DynamicDialogComponent,
    ChildLayoutComponent,
    ProjectFormComponent,
  ],
  templateUrl: './work.component.html',
  styleUrl: './work.component.css',
})
export class WorkComponent {
  // for user
  userList: User[] = MOCK_USERS;

  // for project
  project: Project = this.getEmptyProject();
  projectDialogOpen: boolean = false;
  selectedIndex: number | null = null;

  form: FormGroup;

  iconEdit = faEdit;

  // for dialog
  isDialogVisible = false;

  fields: FieldSchema[] = [
    {
      name: 'username',
      type: 'text',
      label: 'Username',
      required: true,
      colSpan: 11,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      colSpan: 2,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      required: true,
      colSpan: 1,
    },
  ];

  // import and use userService which are declear
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private toaster: ToasterService
  ) {
    this.form = this.fb.group({
      project_title: ['', Validators.required],
      project_subtitle: [''],
      project_project_length: [null],
      project_estimated_date: [''],
      project_costing_needed: [null],
      project_resource_needed: [null],
      projectStatus: ['start'],
      project_requirement: this.fb.array([]),
      working_resource: this.fb.array([]),
    });

    this.addRequirement();
    this.addWorkingResource();
  }

  // project list
  get projectList(): Project[] {
    return this.userService.getCurrentUser()?.projects ?? [];
  }

  // make field empty for project
  getEmptyProject(): Project {
    return {
      id: Date.now(),
      project_title: '',
      project_subtitle: '',
      project_project_length: 0,
      project_estimated_date: '',
      project_costing_needed: 0,
      project_resource_needed: 0,
      project_requirement: [''],
      working_resource: [],
      projectStatus: 'start',
    };
  }

  // open selected project form
  handleProject(event: { index: number; project: Project }) {
    this.selectedIndex = event.index;
    // this.project = { ...event.project };
    this.project = {
      ...event.project,
      project_requirement: [...event.project.project_requirement],
      working_resource: [...event.project.working_resource],
    };
    this.projectDialogOpen = true;
  }
  // open project form dialog
  openProjectDialog() {
    this.resetProjectForm();
    this.isDialogVisible = true;
  }

  //open dialog for edit project
  handleEditProject(event: { project: Project; index: number }) {
    this.selectedIndex = event.index;
    this.project = { ...event.project };
    this.populateProjectForm(this.project);
    this.isDialogVisible = true;
  }

  // close project dialog
  closeprojectDialog() {
    this.projectDialogOpen = false;
    this.project = null!;
    this.selectedIndex = null;
    console.log(this.projectDialogOpen);
  }

  // create or update project
  addProjectResource() {
    this.projectService.updateOrAddProject(
      this.project,
      this.selectedIndex ?? undefined
    );
    this.closeprojectDialog();
  }

  closeDialog() {
    this.isDialogVisible = false;
  }

  saveData() {
    console.log('click dialog for save data');
  }

  // Getter for requirements array
  get project_requirement(): FormArray {
    return this.form.get('project_requirement') as FormArray;
  }

  // Getter for working resources array
  get working_resource(): FormArray {
    return this.form.get('working_resource') as FormArray;
  }

  // Create one working resource group
  private createWorkingResourceGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      time_spent_hours: [null, [Validators.required, Validators.min(0)]],
      performance_score: [null, [Validators.required, Validators.min(0)]],
    });
  }

  // Add a new project requirement
  addRequirement(): void {
    this.project_requirement.push(this.fb.control('', Validators.required));
  }

  // Add a new working resource
  addWorkingResource(): void {
    this.working_resource.push(this.createWorkingResourceGroup());
  }

  //reset form
  private resetProjectForm(): void {
    this.selectedIndex = null;
    this.project = this.getEmptyProject();

    this.form.reset({
      project_title: '',
      project_subtitle: '',
      project_project_length: null,
      project_estimated_date: '',
      project_costing_needed: null,
      project_resource_needed: null,
      projectStatus: 'start',
    });

    this.project_requirement.clear();
    this.working_resource.clear();

    this.addRequirement();
    this.addWorkingResource();
  }

  //for edit refill project field with value
  private populateProjectForm(project: Project): void {
    this.form.patchValue({
      project_title: project.project_title,
      project_subtitle: project.project_subtitle,
      project_project_length: project.project_project_length,
      project_estimated_date: project.project_estimated_date,
      project_costing_needed: project.project_costing_needed,
      project_resource_needed: project.project_resource_needed,
      projectStatus: project.projectStatus,
    });

    this.project_requirement.clear();
    project.project_requirement.forEach((req) =>
      this.project_requirement.push(this.fb.control(req, Validators.required))
    );

    this.working_resource.clear();
    project.working_resource.forEach((resource) =>
      this.working_resource.push(
        this.fb.group({
          name: [resource.name, Validators.required],
          email: [resource.email, [Validators.required, Validators.email]],
          time_spent_hours: [
            resource.time_spent_hours,
            [Validators.required, Validators.min(0)],
          ],
          performance_score: [
            resource.performance_score,
            [Validators.required, Validators.min(0)],
          ],
        })
      )
    );
  }

  // Handle form submission from child
  handleFormSubmit(): void {
    if (this.form.invalid) {
      this.toaster.showToast(
        'Please fill all required fields correctly.',
        'error'
      );
      return;
    }

    const formValue = this.form.getRawValue();

    const newProject: Project = {
      ...formValue,
      id: this.project?.id ?? undefined, // let service handle ID if it's missing
      project_requirement: this.project_requirement.value,
      working_resource: this.working_resource.value,
    };

    this.project = newProject;

    this.projectService
      .updateOrAddProject(newProject, this.selectedIndex ?? undefined)
      .subscribe(() => {
        this.toaster.showToast(
          this.selectedIndex !== null
            ? 'Project updated successfully!'
            : 'Project added successfully!',
          'success'
        );
        this.isDialogVisible = false;
      });
  }
}
