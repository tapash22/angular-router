import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../service/auth/auth.service";
import { inject } from "@angular/core";

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const currentUser = auth.getCurrentUser();

  const allowedRole = route.routeConfig?.path; // 'admin', 'manager', etc

  if (currentUser?.role === allowedRole) {
    return true;
  }

  return router.createUrlTree(["/auth/login"]); // redirect if not allowed
};
