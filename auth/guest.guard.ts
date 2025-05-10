import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../service/auth/auth.service";
import { inject } from "@angular/core";

export const guestGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return true;
  } else {
    // Redirect to dashboard if already logged in
    return router.createUrlTree(["/dashboard"]);
  }
  // return true;
};
