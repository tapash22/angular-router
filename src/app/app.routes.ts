import { Routes } from "@angular/router";
import { activatedGuard } from "./auth/activated.guard";
import { guestGuard } from "./auth/guest.guard";
import { roleGuard } from "./auth/role.guard";
import { roleRedirectGuard } from "./auth/role-redirect.guard";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/dashboard",
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("./views/dashboard/dashboard.component").then(
        (m) => m.DashboardComponent
      ),
    canActivate: [activatedGuard],
    data: { hideSidebar: true },
    children: [
      {
        path: "",
        pathMatch: "full",
        canActivate: [roleRedirectGuard],
        loadComponent: () =>
          import("./views/dummy/dummy.component").then((m) => m.DummyComponent),
      },
      {
        path: "admin",
        canActivate: [roleGuard],
        loadComponent: () =>
          import("./views/admin/admin.component").then((m) => m.AdminComponent),
      },
      {
        path: "manager",
        canActivate: [roleGuard],
        loadComponent: () =>
          import("./views/manager/manager.component").then(
            (m) => m.ManagerComponent
          ),
      },
      {
        path: "officer",
        canActivate: [roleGuard],
        loadComponent: () =>
          import("./views/officer/officer.component").then(
            (m) => m.OfficerComponent
          ),
      },
      {
        path: "employee",
        loadComponent: () =>
          import("./views/employee/employee.component").then(
            (m) => m.EmployeeComponent
          ),
      },
      {
        path: "performance",
        loadComponent: () =>
          import("./views/performance/performance.component").then(
            (m) => m.PerformanceComponent
          ),
      },
      {
        path: "work",
        loadComponent: () =>
          import("./views/work/work.component").then((m) => m.WorkComponent),
      },
      {
        path: "profile",
        loadComponent: () =>
          import("./views/profile/profile.component").then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: "reset-password",
        loadComponent: () =>
          import("./views/reset-password/reset-password.component").then(
            (m) => m.ResetPasswordComponent
          ),
      },
    ],
  },
  {
    path: "auth",
    loadComponent: () =>
      import("./views/auth/auth.component").then((m) => m.AuthComponent),
    data: { hideSidebar: true },
    canActivate: [guestGuard],
    children: [
      {
        path: "login",
        loadComponent: () =>
          import("./views/login/login.component").then((m) => m.LoginComponent),
      },
      {
        path: "registration",
        loadComponent: () =>
          import("./views/registration/registration.component").then(
            (m) => m.RegistrationComponent
          ),
      },
    ],
  },
];
