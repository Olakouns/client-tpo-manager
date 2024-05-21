import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {LoginService} from "../login.service";
import {Router} from "@angular/router";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  if (authService.isAuth()) {
    req = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + authService.getAccessToken()
      },
    });
  }
  return next(req);
};
