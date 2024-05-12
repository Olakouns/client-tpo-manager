import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TPOListComponent} from "./tpolist/tpolist.component";
import { TPODetailsComponent } from './tpolist/tpodetails/tpodetails.component';
import {ConstantManagementComponent} from "./constant-management/constant-management.component";

const routes: Routes = [
  {
    path: '', component: TPOListComponent
  },
  {
    path: 'constant-config', component: ConstantManagementComponent
  },
  {
    path: ':tpoId', component: TPODetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TPOBaseManagementRoutingModule { }
