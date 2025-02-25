import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLoggedIn) {
    return true;
  }
  else {
    router.navigate(['/login']);
    return false;
  }
};
