import { Component } from '@angular/core';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";

@Component({
  selector: 'app-loader-skeleton-item',
  standalone: true,
  imports: [
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './loader-skeleton-item.component.html',
  styleUrl: './loader-skeleton-item.component.scss'
})
export class LoaderSkeletonItemComponent {

}
