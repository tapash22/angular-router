import { inject, Injectable } from "@angular/core";
import {  RegistrationPayload } from "../../interfaces/user";
import { Router } from "@angular/router";
import { UserService } from "../user.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private router = inject(Router);
  private userService = inject(UserService);

  constructor() {
    this.userService.initUsers();
  }

  login(email: string, password: string): boolean {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    const user = this.userService
      .getAllUsers()
      .find(
        (u) => u.email === normalizedEmail && u.password === normalizedPassword
      );

    if (user) {
      this.userService.setCurrentUser(user);
      return true;
    }
    return false;
  }

  logout(): void {
    this.userService.clearCurrentUser();
    this.router.navigateByUrl("/auth/login", { replaceUrl: true });
  }

  register(newUser: RegistrationPayload): boolean {
    return this.userService.addUser(newUser);
  }

  isAuthenticated(): boolean {
    return !!this.userService.getCurrentUser();
  }

  hasRole(role: "admin" | "manager" | "officer" | "user"): boolean {
    return this.userService.getCurrentUser()?.role === role;
  }

  //router nagivation
  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url, { replaceUrl: true });
  }
}
