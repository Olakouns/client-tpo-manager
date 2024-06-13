import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TPOWorkOrder } from '../../../models/tpowork-order';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { AddWorkOrderComponent } from '../add-work-order/add-work-order.component';

@Component({
  selector: 'app-work-order-item',
  standalone: true,
  imports: [MatIcon, MatMenu,  MatMenuTrigger, MatMenuItem, MatButtonModule],
  templateUrl: './work-order-item.component.html',
  styleUrl: './work-order-item.component.scss'
})
export class WorkOrderItemComponent {
  @Input({ required: true }) wk: TPOWorkOrder;
  @Output() onDelete: EventEmitter<TPOWorkOrder> = new EventEmitter<TPOWorkOrder>();

  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  editWorkOrder() {
    const dialog = this.dialog.open(AddWorkOrderComponent, {
      width: '700px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: JSON.parse(JSON.stringify({
        workOrder: this.wk
      }))
    });

    dialog.afterClosed().subscribe({
      next: (response: TPOWorkOrder) => {
        if (response) {
          this.wk = response;
        }
      }
    })
  }

}
