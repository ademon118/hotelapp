import { CanActivateChildFn } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const roomGuard: CanActivateChildFn = (childRoute, state) => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isAdmin) {
    return true;
  }
  else {
    router.navigate(['/login']);
    return false;
  }
};
