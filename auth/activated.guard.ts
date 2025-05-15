import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

export const activatedGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService)

  if(auth.isAuthenticated()){
    return true
  }else{
    auth.navigateByUrl('/auth/login')
    return false
  }
};
