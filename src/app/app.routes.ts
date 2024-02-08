import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home', loadChildren: () => import('./tpobase-management/tpobase-management.module').then(m => m.TPOBaseManagementModule)
  }
];
