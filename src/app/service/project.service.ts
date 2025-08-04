import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Project } from '../interfaces/user';
import { map, Observable, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private userService: UserService) {}

  //update user project score
updateUserProjectResourceScore(
  projectId: number,
  resourceId: number,
  updatedFields: {
    name?: string;
    email?: string;
    time_spent_hours?: number;
    performance_score?: number;
  }
): Observable<boolean> {
  return this.userService.currentUser$.pipe(
    take(1),
    switchMap((user) => {
      if (!user?.projects || !Array.isArray(user.projects)) {
        return of(false);
      }

      const projectIndex = user.projects.findIndex((p) => p.id === projectId);
      if (projectIndex === -1) return of(false);

      const project = user.projects[projectIndex];
      const existingResources = project.working_resource ?? [];

      const resourceIndex = existingResources.findIndex((r) => r.id === resourceId);

      // 🔄 Updated resource list
      const updatedWorkingResource = [...existingResources];

      if (resourceIndex !== -1) {
        // ✅ Update existing
        const existing = existingResources[resourceIndex];
        updatedWorkingResource[resourceIndex] = {
          ...existing,
          ...updatedFields,
        };
      } else {
        // ✅ Add new
        updatedWorkingResource.push({
          id: resourceId,
          name: updatedFields.name ?? '',
          email: updatedFields.email ?? '',
          time_spent_hours: updatedFields.time_spent_hours ?? 0,
          performance_score: updatedFields.performance_score ?? 0,
        });
      }

      // 🧠 Replace project
      const updatedProjects = [...user.projects];
      updatedProjects[projectIndex] = {
        ...project,
        working_resource: updatedWorkingResource,
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
