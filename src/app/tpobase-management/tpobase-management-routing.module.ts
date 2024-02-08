import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TPOListComponent} from "./tpolist/tpolist.component";

const routes: Routes = [
  {
    path: '', component: TPOListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TPOBaseManagementRoutingModule { }
