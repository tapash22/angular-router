import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { Project } from "../interfaces/user";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  constructor(private userService: UserService) {}

  //update user project score
  updateUserProjectResourceScore(
    projectId: number,
    resourceId: number,
    updatedScore: number
  ): boolean {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return false;

    const user = currentUser;
    if (!user.projects || !Array.isArray(user.projects)) return false;

    const projectIndex = user.projects.findIndex((p) => p.id === projectId);
    if (projectIndex === -1) return false;

    const project = user.projects[projectIndex];
    const resourceIndex = project.working_resource.findIndex(
      (r) => r.id === resourceId
    );
    if (resourceIndex === -1) return false;

    project.working_resource[resourceIndex].performance_score = updatedScore;
    user.projects[projectIndex] = project;

    return this.userService.updateCurrentUserFields({
      projects: user.projects,
    });
  }

  //added or update project
  updateOrAddProject(project: Project, index?: number): void {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    if (!currentUser.projects) currentUser.projects = [];

    if (
      index !== undefined &&
      index > -1 &&
      index < currentUser.projects.length
    ) {
      currentUser.projects[index] = { ...project };
    } else {
      const newId =
        Math.max(0, ...currentUser.projects.map((p) => p.id ?? 0)) + 1;
      project.id = newId;
      currentUser.projects.push({ ...project });
    }

    this.userService.updateCurrentUserFields({
      projects: currentUser.projects,
    });
  }
}
