import {Component, Inject, OnInit} from '@angular/core';
import {CdkDropList} from "@angular/cdk/drag-drop";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgIf} from "@angular/common";
import {TPOWorkOrder} from "../../../../models/tpowork-order";
import {FormBuilder, FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApiService} from "../../../../services/api.service";
import {TPOData} from "../../../../models/tpodata";
import { AddWorkOrderComponent } from '../../../work-order-management/add-work-order/add-work-order.component';

@Component({
  selector: 'app-add-system-state',
  standalone: true,
  imports: [
    CdkDropList,
    MatButton,
    MatDialogContent,
    MatFormField,
    MatProgressSpinner,
    MatSelect,
    NgIf,
    ReactiveFormsModule,
    MatOption
  ],
  templateUrl: './add-system-state.component.html',
  styleUrl: './add-system-state.component.scss'
})
export class AddSystemStateComponent implements OnInit {
  diagTitle = 'Add system state';
  isLoading = false;
  errorMessage = "";
  hasError = false;
  tpoWorkOrders: Array<TPOWorkOrder> = new Array<TPOWorkOrder>();
  tpoWorkSelected: Array<TPOWorkOrder> = new Array<TPOWorkOrder>();
  toppings: FormControl<TPOWorkOrder[] | null> = new FormControl([]);

  constructor(public dialogRef: MatDialogRef<AddSystemStateComponent>,
              public formBuilder: FormBuilder,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: TPOData,
              private _snackBar: MatSnackBar,
              private apiService: ApiService) {
    if (data.previousStatesData) {
      this.tpoWorkSelected = data.previousStatesData.slice();
      this.toppings = new FormControl(this.tpoWorkSelected);
    }
  }

  ngOnInit(): void {
    this.apiService.getAllTpoWordOrders().subscribe({
      next: response => {
        this.tpoWorkOrders = response;
      },
      error: error => {
        this.hasError = true;
        this.errorMessage = error.message;
      }
    });
  }

  compareFn(c1: TPOWorkOrder, c2: TPOWorkOrder): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onClose() {
    this.dialogRef.close()
  }

  onChangeAction($event: Array<TPOWorkOrder>) {
    this.tpoWorkSelected = [...$event];
  }

  openDialog() {
    const dialog = this.dialog.open(AddWorkOrderComponent, {
      width: '700px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms'
    });

    dialog.afterClosed().subscribe({
      next: (response: TPOWorkOrder) => {
        if (response) {
          this.tpoWorkOrders.unshift(response);
        }
      }
    })
  }

  onSave() {
    this.isLoading = true;
    // todo : save data into tpo_data previous state
  }

}
