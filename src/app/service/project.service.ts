import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Project } from '../interfaces/user';
import { map, Observable, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private userService: UserService) {}

  //it can be handle user project resource add or update or remove/detele
  userProjectResource(
    projectId: number,
    resourceId: number,
    updatedFields: {
      name?: string;
      email?: string;
      time_spent_hours?: number;
      performance_score?: number;
      remove?: boolean;
    },
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

        let updatedWorkingResource: typeof existingResources;

        if (updatedFields.remove) {
          // 🗑️ Delete logic
          updatedWorkingResource = existingResources.filter(
            (r) => r.id !== resourceId,
          );
        } else {
          const resourceIndex = existingResources.findIndex(
            (r) => r.id === resourceId,
          );
          updatedWorkingResource = [...existingResources];

          if (resourceIndex !== -1) {
            // ✅ Update existing resource
            const existing = existingResources[resourceIndex];
            updatedWorkingResource[resourceIndex] = {
              ...existing,
              ...updatedFields,
            };
          } else {
            // ➕ Add new resource
            const newId =
              existingResources.length > 0
                ? Math.max(...existingResources.map((r) => r.id)) + 1
                : 1;

            const newResource = {
              id: newId,
              name: updatedFields.name ?? '',
              email: updatedFields.email ?? '',
              time_spent_hours: updatedFields.time_spent_hours ?? 0,
              performance_score: updatedFields.performance_score ?? 0,
            };

            updatedWorkingResource.push(newResource);
          }
        }

        // 🔁 Replace project
        const updatedProjects = [...user.projects];
        updatedProjects[projectIndex] = {
          ...project,
          working_resource: updatedWorkingResource,
        };

        return this.userService.updateCurrentUserFields({
          projects: updatedProjects,
        });
      }),
    );
  }

  //update or added user project
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
      }),
    );
  }

  //remove user project
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
      }),
    );
  }
}
