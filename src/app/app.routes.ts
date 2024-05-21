import {Routes} from '@angular/router';
import {authInterceptor} from "./services/interceptors/auth.interceptor";
import {authGuard} from "./auth.guard";

export const routes: Routes = [
  {
    path: 'tpo-management',
    loadChildren: () => import('./tpobase-management/tpobase-management.module').then(m => m.TPOBaseManagementModule),
    canActivate: [authGuard]
  },
  {
    path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  }
];
