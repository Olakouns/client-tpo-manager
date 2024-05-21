import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "./services/login.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  if (authService.isAuth()) {
    return true;
  } else {
    localStorage.setItem('last_action_url', state.url);
    router.navigateByUrl('/').then();
    return false;
  }
};
