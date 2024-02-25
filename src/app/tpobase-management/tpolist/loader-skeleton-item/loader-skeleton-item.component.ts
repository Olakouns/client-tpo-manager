import { Component } from '@angular/core';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem} from "@angular/material/menu";

@Component({
  selector: 'app-loader-skeleton-item',
  standalone: true,
  imports: [
    NgxSkeletonLoaderModule,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem
  ],
  templateUrl: './loader-skeleton-item.component.html',
  styleUrl: './loader-skeleton-item.component.scss'
})
export class LoaderSkeletonItemComponent {

}
