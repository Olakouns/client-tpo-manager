import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MonacoEditorModule } from 'ngx-monaco-editor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MonacoEditorModule.forRoot()
  ]
})
export class HomeModule { }
