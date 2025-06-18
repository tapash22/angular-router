import { inject, Injectable } from "@angular/core";
import { User, RegistrationPayload, Project } from "../../interfaces/user";
import { Router } from "@angular/router";
import { MOCK_USERS } from "../../localStore/user-data";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private router = inject(Router); //import router

  private users: User[] = MOCK_USERS; //import user array

  private currentUser: User | null = null;

  constructor() {
    const storedUsers = localStorage.getItem("users");

    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      // Save MOCK_USERS to localStorage on first load
      this.users = MOCK_USERS;
      localStorage.setItem("users", JSON.stringify(this.users));
    }
  }

  //login method
  login(email: string, password: string): boolean {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    const user = this.users.find(
      (u) => u.email === normalizedEmail && u.password === normalizedPassword
    );

    if (user) {
      this.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  }

  //logout method
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("users");
    this.navigateByUrl("/auth/login");
  }

  //registration method
  register(newUser: RegistrationPayload): boolean {
    const exists = this.users.some((u) => u.email === newUser.email);

    if (exists) {
      return false; // Email already in use
    }

    const userToSave: User = {
      id: this.users.length ? this.users.length + 1 : 1, // unique ID
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: "user", // default role
    };

    this.users.push(userToSave);
    localStorage.setItem("users", JSON.stringify(this.users));
    return true;
  }

  //update user profile
  updateUserProfile(updatedData: Partial<User>): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;
    // Sync in-memory users with localStorage
    this.users = JSON.parse(localStorage.getItem("users") || "[]");

    // const currentUser = this.getCurrentUser();
    if (!currentUser) return false;

    const index = this.users.findIndex((u) => u.id === currentUser.id);
    if (index === -1) return false;

    this.users[index] = {
      ...this.users[index],
      ...updatedData,
    };

    // Save both in-memory and localStorage users
    localStorage.setItem("users", JSON.stringify(this.users));
    localStorage.setItem("currentUser", JSON.stringify(this.users[index]));

    // Optional: update in-memory currentUser
    this.currentUser = this.users[index];

    return true;
  }

  // Update a specific resource's performance score inside a specific project
  updateUserProjectResourceScore(
    projectId: number,
    resourceId: number,
    updatedScore: number
  ): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;

    this.users = JSON.parse(localStorage.getItem("users") || "[]");

    const userIndex = this.users.findIndex((u) => u.id === currentUser.id);
    if (userIndex === -1) return false;

    const user = this.users[userIndex];

    // ✅ Safely check if projects exist
    if (!user.projects || !Array.isArray(user.projects)) return false;

    const projectIndex = user.projects.findIndex((p) => p.id === projectId);
    if (projectIndex === -1) return false;

    const project = user.projects[projectIndex];

    const resourceIndex = project.working_resource.findIndex(
      (r) => r.id === resourceId
    );
    if (resourceIndex === -1) return false;

    // ✅ Update performance score
    project.working_resource[resourceIndex].performance_score = updatedScore;

    // ✅ Update the user's project list
    user.projects[projectIndex] = project;

    // ✅ Update the user
    this.users[userIndex] = user;

    // ✅ Save back to localStorage and memory
    localStorage.setItem("users", JSON.stringify(this.users));
    localStorage.setItem("currentUser", JSON.stringify(this.users[userIndex]));
    this.currentUser = this.users[userIndex];

    return true;
  }

  //current user information
  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const userData = localStorage.getItem("currentUser");

      if (userData) {
        this.currentUser = JSON.parse(userData) as User;
      }
    }
    return this.currentUser;
  }

  //all user list
  getAllUsers(): User[] | [] {
    return this.users;
  }

  //check auth
  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  //role check
  hasRole(role: "admin" | "manager" | "officer" | "user"): boolean {
    return this.getCurrentUser()?.role === role;
  }

  //update password
  updatePassword(newPassword: string): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;

    // Update the password in the user list
    const userIndex = this.users.findIndex((u) => u.id === currentUser.id);
    if (userIndex === -1) return false;

    this.users[userIndex].password = newPassword;

    // Save back to localStorage
    localStorage.setItem("users", JSON.stringify(this.users));
    localStorage.setItem("currentUser", JSON.stringify(this.users[userIndex]));
    this.currentUser = this.users[userIndex];

    return true;
  }

  // add or update project
  updateOrAddProject(project: Project, index?: number): void {
    const currentUser = this.getCurrentUser();
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

    this.currentUser = currentUser;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }

  //router nagivation
  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url, { replaceUrl: true });
  }
}
