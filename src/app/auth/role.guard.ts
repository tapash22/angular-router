import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../service/user.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const currentUser = userService.getCurrentUser();

  const allowedRole = route.routeConfig?.path; // 'admin', 'manager', etc

  if (currentUser?.role === allowedRole) {
    return true;
  }

  return router.createUrlTree(['/auth/login']); // redirect if not allowed
};
