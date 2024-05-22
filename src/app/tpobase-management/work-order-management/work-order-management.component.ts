import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Slide } from '../../payload/slide';
import { Page } from '../../payload/page';
import { TPOWorkOrder } from '../../models/tpowork-order';
import { AddWorkOrderComponent } from '../tpolist/tpodetails/add-work-order/add-work-order.component';
import { SketchComponent } from '../sketch/sketch.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatMenu } from '@angular/material/menu';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { WorkOrderItemComponent } from './work-order-item/work-order-item.component';
import { WkSkeletonLoaderComponent } from './wk-skeleton-loader/wk-skeleton-loader.component';

@Component({
  selector: 'app-work-order-management',
  standalone: true,
  imports: [
    SketchComponent, 
    MatFormField, 
    MatInput, 
    MatIcon, 
    MatButton, 
    MatMenu, 
    WorkOrderItemComponent,
    WkSkeletonLoaderComponent
  ],
  templateUrl: './work-order-management.component.html',
  styleUrl: './work-order-management.component.scss'
})
export class WorkOrderManagementComponent implements OnInit {

  slide: Slide = {
    image: "assets/tpo-slide-1.png",
    description: "\"Explore the future of your configurations with simplicity and precision. <br> Configuring is innovating!\""
  };

  workOrders: Page<TPOWorkOrder> = new Page<TPOWorkOrder>();
  loading: boolean;
  search = "";
  page = 0;
  size = 50;

  constructor(private apiService: ApiService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  handlePageEvent(event: any) {
    if (event.pageSize != this.size) {
      this.size = event.pageSize;
      this.page = 0;
    } else {
      this.page = event.pageIndex;
    }
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.apiService.getWorkOrdersPage(this.search, this.page, this.size).subscribe({
      next: response => {
        this.loading = false;
        this.workOrders = response;

        console.log(response);
        
      },
      error: error => {
        this.loading = false;
      }
    });
  }

  onSearch(search : string) {
    this.search = search;
    this.loadData();
  }

  onAddWK() {
    const dialog = this.dialog.open(AddWorkOrderComponent, {
      width: '700px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms'
    });

    dialog.afterClosed().subscribe({
      next: (response: TPOWorkOrder) => {
        if (response) {
          this.workOrders.content.unshift(response);
        }
      }
    })
  }

  onDeleteWK(workOrder: TPOWorkOrder) {

  }
}
