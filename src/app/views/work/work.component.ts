import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ProjectCardComponent } from "../../component/childs/project-card/project-card.component";
import { Project, User } from "../../interfaces/user";
import { MOCK_USERS } from "../../localStore/user-data";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from "@angular/forms";
import { DynamicDialogComponent } from "../../component/dialog/dynamic-dialog/dynamic-dialog.component";
import { DynamicFormComponent } from "../../component/form/dynamic-form/dynamic-form.component";
import { FieldSchema } from "../../interfaces/form-field-schema";
import { UserService } from "../../service/user.service";
import { ProjectService } from "../../service/project.service";

@Component({
  selector: "app-work",
  imports: [
    CommonModule,
    ProjectCardComponent,
    ReactiveFormsModule,
    DynamicDialogComponent,
    DynamicFormComponent,
  ],
  templateUrl: "./work.component.html",
  styleUrl: "./work.component.css",
})
export class WorkComponent  {
  // for user
  userList: User[] = MOCK_USERS;

  // for project
  project: Project = this.getEmptyProject();
  projectDialogOpen: boolean = false;
  selectedIndex: number | null = null;

  form: FormGroup;

  // for dialog
  isDialogVisible = false;

  fields: FieldSchema[] = [
    {
      name: "username",
      type: "text",
      label: "Username",
      required: true,
      colSpan: 11,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      colSpan: 2,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      colSpan: 1,
    },
  ];

  // import and use userService which are declear
  constructor(private userService: UserService,private projectService:ProjectService, private fb: FormBuilder) {
    this.form = this.fb.group({
      project_title: ["", Validators.required],
      project_subtitle: [""],
      project_project_length: [null],
      project_estimated_date: [""],
      project_costing_needed: [null],
      project_resource_needed: [null],
      projectStatus: ["start"],
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
      project_title: "",
      project_subtitle: "",
      project_project_length: 0,
      project_estimated_date: "",
      project_costing_needed: 0,
      project_resource_needed: 0,
      project_requirement: [""],
      working_resource: [],
      projectStatus: "start",
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
    this.getEmptyProject();
    this.selectedIndex = null;
    this.projectDialogOpen = true;
  }

  // close project dialog
  closeprojectDialog() {
    this.projectDialogOpen = false;
    this.project = null!;
    this.selectedIndex = null;
    console.log(this.projectDialogOpen);
    // this.getEmptyProject()
  }

  // create or update project
  addProjectResource() {
    console.log(this.project, this.selectedIndex);
    this.projectService.updateOrAddProject(
      this.project,
      this.selectedIndex ?? undefined
    );
    this.closeprojectDialog();
  }

  openDialog() {
    this.isDialogVisible = true;
  }

  closeDialog() {
    this.isDialogVisible = false;
  }

  saveData() {
    console.log("click dialog for save data");
  }

  // Getter for requirements array
  get project_requirement(): FormArray {
    return this.form.get("project_requirement") as FormArray;
  }

  // Getter for working resources array
  get working_resource(): FormArray {
    return this.form.get("working_resource") as FormArray;
  }

  // Create one working resource group
  private createWorkingResourceGroup(): FormGroup {
    return this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      time_spent_hours: [null, [Validators.required, Validators.min(0)]],
      performance_score: [null, [Validators.required, Validators.min(0)]],
    });
  }

  // Add a new project requirement
  addRequirement(): void {
    this.project_requirement.push(this.fb.control("", Validators.required));
  }

  // Add a new working resource
  addWorkingResource(): void {
    this.working_resource.push(this.createWorkingResourceGroup());
  }

  // Handle form submission from child
  handleFormSubmit(formValue: any): void {
    if (this.form.valid) {
      console.log("Form submitted with value:", formValue);
      // Add your submit logic here (e.g., save to backend or localStorage)
    } else {
      console.warn("Form is invalid");
    }
  }
}
