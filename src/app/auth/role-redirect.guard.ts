import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../service/auth/auth.service"; 
import { inject } from "@angular/core";
import { UserRole } from "../interfaces/user";
import { UserService } from "../service/user.service";

export const roleRedirectGuard: CanActivateFn = (route, state) => {
  //import authService service and router for use this property or method for using
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  //check user are not authenticated then go to login page this are child of authService
  if (!authService.isAuthenticated) {
    return router.createUrlTree(["/authService/login"]);
  }

  //make role to default router
  const roleRoutes: Record<UserRole, string> = {
    admin: "/dashboard/admin",
    manager: "/dashboard/manager",
    officer: "/dashboard/officer",
    user: "/dashboard/employee",
  };

  // Get the current user's role
  const role = userService.getCurrentUser()?.role as UserRole | undefined;

  // Resolve route based on role or fallback to generic dashboard
  const defaultRoute =
    role && roleRoutes[role] ? roleRoutes[role] : "/dashboard";

  return router.createUrlTree([defaultRoute]);
};
