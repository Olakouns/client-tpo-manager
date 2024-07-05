import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {TPOWorkOrder} from "../../../../models/tpowork-order";
import {ApiService} from "../../../../services/api.service";
import {NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-use-work-order',
  standalone: true,
  imports: [
    MatDialogContent,
    NgIf,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    FormsModule,
    ReactiveFormsModule,
    CdkDropList,
    CdkDrag,
    MatButton,
    MatProgressSpinner,
  ],
  templateUrl: './use-work-order.component.html',
  styleUrl: './use-work-order.component.scss'
})
export class UseWorkOrderComponent implements OnInit {
  diagTitle = 'Add Work orders to TPO';
  isLoading = false;
  errorMessage = "";
  hasError = false;

  tpoWorkOrders: Array<TPOWorkOrder> = new Array<TPOWorkOrder>();
  tpoWorkSelected: Array<TPOWorkOrder> = new Array<TPOWorkOrder>();
  toppings = new FormControl('');

  constructor(public dialogRef: MatDialogRef<UseWorkOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                tpoId: number,
                wk: Array<TPOWorkOrder>
              },
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getAllTpoWordOrders().subscribe({
      next: response => {
        this.tpoWorkOrders = response;
        // remove all element that already exist in data.wk
        this.tpoWorkOrders = this.tpoWorkOrders.filter(t => !this.data.wk.some(wk => wk.id === t.id));
      },
      error: error => {
        this.hasError = true;
        this.errorMessage = error.message;
      }
    });
  }

  onChangeAction($event: Array<TPOWorkOrder>) {
    this.tpoWorkSelected = [...$event];
  }

  drop(event: CdkDragDrop<TPOWorkOrder[]>) {
    moveItemInArray(this.tpoWorkSelected, event.previousIndex, event.currentIndex);
  }

  onClose() {
    this.dialogRef.close()
  }

  onSave() {
    this.isLoading = true;
    this.apiService.addManyTpoWordOrder(this.data.tpoId, this.tpoWorkSelected).subscribe({
      next: response => {
        this.isLoading = false;
        this.dialogRef.close(this.tpoWorkSelected);
      },
      error: error => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = error.message;
      }
    });
  }
}
