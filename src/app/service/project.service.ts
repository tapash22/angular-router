import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Project } from '../interfaces/user';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private userService: UserService) {}

  //update user project score
  updateUserProjectResourceScore(
    projectId: number,
    resourceId: number,
    updatedScore: number
  ) {
    return this.userService.currentUser$.pipe(
      take(1), // only need latest snapshot
      map((user) => {
        if (!user?.projects || !Array.isArray(user.projects)) return false;

        const projectIndex = user.projects.findIndex((p) => p.id === projectId);
        if (projectIndex === -1) return false;

        const project = user.projects[projectIndex];
        const resourceIndex = project.working_resource.findIndex(
          (r) => r.id === resourceId
        );
        if (resourceIndex === -1) return false;

        // Update score
        const updatedProjects = [...user.projects];
        updatedProjects[projectIndex] = {
          ...project,
          working_resource: [
            ...project.working_resource.slice(0, resourceIndex),
            {
              ...project.working_resource[resourceIndex],
              performance_score: updatedScore,
            },
            ...project.working_resource.slice(resourceIndex + 1),
          ],
        };

        return this.userService.updateCurrentUserFields({
          projects: updatedProjects,
        });
      })
    );
  }

  //added or update project
  updateOrAddProject(project: Project, index?: number) {
    return this.userService.currentUser$.pipe(
      take(1),
      map((user) => {
        if (!user) return;

        const updatedProjects = user.projects ? [...user.projects] : [];

        if (
          index !== undefined &&
          index > -1 &&
          index < updatedProjects.length
        ) {
          updatedProjects[index] = { ...project };
        } else {
          const newId =
            Math.max(0, ...updatedProjects.map((p) => p.id ?? 0)) + 1;
          project.id = newId;
          project.projectStatus = project.projectStatus
            ? project.projectStatus
            : 'start';
          updatedProjects.push({ ...project });
        }

        this.userService.updateCurrentUserFields({ projects: updatedProjects });
      })
    );
  }

  deleteProject(index: number) {
    return this.userService.currentUser$.pipe(
      take(1),
      map((user) => {
        if (!user) return;

        const updatedProjects = user.projects ? [...user.projects] : [];

        if (index < 0 || index >= updatedProjects.length) {
          throw new Error('Invalid project index');
        }

        updatedProjects.splice(index, 1); 

        this.userService.updateCurrentUserFields({ projects: updatedProjects });
      })
    );
  }
}
