import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  console.log('AuthGuard#canActivate called');

  if(localStorage.getItem('token')) {
    console.log('AuthGuard#canActivate: User is authenticated');
    return true;
  }
  router.navigate(['/login']);
  return false;
};
