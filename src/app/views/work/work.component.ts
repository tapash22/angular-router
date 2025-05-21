import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ProjectCardComponent } from "../../component/childs/project-card/project-card.component";
import { Project, User } from "../../interfaces/user";
import { MOCK_USERS } from "../../localStore/user-data";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../service/auth/auth.service";
import { DynamicDialogComponent } from "../../component/dialog/dynamic-dialog/dynamic-dialog.component";
import { DynamicFormComponent } from "../../component/form/dynamic-form/dynamic-form.component";
import { FieldSchema } from "../../interfaces/form-field-schema";

@Component({
  selector: "app-work",
  imports: [
    CommonModule,
    ProjectCardComponent,
    FormsModule,
    DynamicDialogComponent,
    DynamicFormComponent
  ],
  templateUrl: "./work.component.html",
  styleUrl: "./work.component.css",
})
export class WorkComponent {
  // for user
  userList: User[] = MOCK_USERS;

  // for project
  project: Project = this.getEmptyProject();
  projectDialogOpen: boolean = false;
  selectedIndex: number | null = null;

  // for dialog
  isDialogVisible = false;

  fields:FieldSchema[] = [
    { name: "username", type: "text", label: "Username", required: true,colSpan:11 },
    { name: "email", type: "email", label: "Email", required: true,colSpan:1 },
    { name: "password", type: "password", label: "Password", required: true,colSpan:1 },
  ];

  // import and use authservice which are declear
  constructor(private authService: AuthService) {}

  // project list
  get projectList(): Project[] {
    return this.authService.getCurrentUser()?.projects ?? [];
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
    this.authService.updateOrAddProject(
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

  saveData(){
    console.log("click dialog for save data")
  }
}
