import { Routes } from "@angular/router";
import { activatedGuard } from "./auth/activated.guard";
import { guestGuard } from "./auth/guest.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
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
        path: "admin",
        loadComponent: () =>
          import("./views/admin/admin.component").then((m) => m.AdminComponent),
      },
      {
        path: "manager",
        loadComponent: () =>
          import("./views/manager/manager.component").then(
            (m) => m.ManagerComponent
          ),
      },
      {
        path: "officer",
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
    ],
  },
  {
    path: "auth",
    loadComponent: () =>
      import("./views/auth/auth.component").then((m) => m.AuthComponent),
    data: { hideSidebar: true },
    canActivate: [guestGuard], // 👈 FIXED guard
    children: [
      {
        path: "login",
        loadComponent: () =>
          import("./views/login/login.component").then((m) => m.LoginComponent),
      },
      {
        path: "registrati",
        loadComponent: () =>
          import("./views/registration/registration.component").then(
            (m) => m.RegistrationComponent
          ),
      },
    ],
  },
];
