import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

export const activatedGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService)
  const router = inject(Router)

<<<<<<< HEAD
  if(auth.isAuthenticated()){
    return true
  }else{
    auth.navigateByUrl('/auth/login')
    return false
=======
   if (auth.isAuthenticated()) {
    return true;
  } else {
    return router.createUrlTree(['/auth/login']);
>>>>>>> main-page
  }
};
