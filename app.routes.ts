import { Routes } from "@angular/router";
import { activatedGuard } from "./auth/activated.guard";

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
      canActivate:[activatedGuard]
  },
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
  {
    path: "login",
    loadComponent: () =>
      import("./views/login/login.component").then((m) => m.LoginComponent),
  },
];
