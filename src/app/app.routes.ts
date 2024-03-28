import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tpo-management', loadChildren: () => import('./tpobase-management/tpobase-management.module').then(m => m.TPOBaseManagementModule)
  },
  {
    path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  }
];
