import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ProjectCardComponent } from "../../component/childs/project-card/project-card.component";
import { Project, User } from "../../interfaces/user";
import { MOCK_USERS } from "../../localStore/user-data";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../service/auth/auth.service";

@Component({
  selector: "app-work",
  imports: [CommonModule, ProjectCardComponent, FormsModule],
  templateUrl: "./work.component.html",
  styleUrl: "./work.component.css",
})
export class WorkComponent {
  userList: User[] = MOCK_USERS;
  project: Project = this.getEmptyProject();

  projectDialogOpen: boolean = false;

  selectedIndex: number | null = null;
  constructor(private authService: AuthService) {}

  get projectList(): Project[] {
    return this.authService.getCurrentUser()?.projects ?? [];
  }

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

  handleProject(event: { index: number; project: Project }) {
    this.selectedIndex = event.index;
    // this.project = { ...event.project };
    this.project = {
      ...event.project,
      project_requirement: [...event.project.project_requirement],
      working_resource: [...event.project.working_resource],
    };
    this.projectDialogOpen = true;

    console.log(this.project);
  }

  openProjectDialog() {
    this.getEmptyProject();
    this.selectedIndex = null;
    this.projectDialogOpen = true;
  }

  closeprojectDialog() {
    this.projectDialogOpen = false;
    this.project = null!;
    this.selectedIndex = null;
    console.log(this.projectDialogOpen);
    // this.getEmptyProject()
  }

  addProjectResource() {
    console.log(this.project, this.selectedIndex);
    this.authService.updateOrAddProject(
      this.project,
      this.selectedIndex ?? undefined
    );
    this.closeprojectDialog();
  }
}
