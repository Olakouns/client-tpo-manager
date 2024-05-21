import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TPOWorkOrder} from "../../../../models/tpowork-order";
import {ApiService} from "../../../../services/api.service";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatOption, MatSelect} from "@angular/material/select";
import {AddWorkOrderComponent} from "../add-work-order/add-work-order.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastMessageComponent} from "../../../toast-message/toast-message.component";

@Component({
  selector: 'app-edit-failure-step-wk',
  standalone: true,
  imports: [
    MatDialogContent,
    NgIf,
    CdkDropList,
    MatButton,
    MatFormField,
    MatProgressSpinner,
    MatSelect,
    MatOption,
    CdkDropList,
    CdkDrag,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './edit-failure-step-wk.component.html',
  styleUrl: './edit-failure-step-wk.component.scss'
})
export class EditFailureStepWkComponent implements OnInit {
  diagTitle = 'Use existing work order';
  isLoading = false;
  errorMessage = "";
  hasError = false;
  tpoWorkOrders: Array<TPOWorkOrder> = new Array<TPOWorkOrder>();
  tpoWorkSelected: Array<TPOWorkOrder> = new Array<TPOWorkOrder>();
  toppings : FormControl<TPOWorkOrder[] | null> = new FormControl([]);


  constructor(public dialogRef: MatDialogRef<EditFailureStepWkComponent>,
              public formBuilder: FormBuilder,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: {
                wk: TPOWorkOrder,
                failureTpoWorkOrders: Array<TPOWorkOrder>
              },
              private _snackBar: MatSnackBar,
              private apiService: ApiService) {
    if (data.wk.linkedList) {
      this.tpoWorkSelected = data.wk.linkedList.slice();
      this.toppings = new FormControl(this.tpoWorkSelected);
    }
  }

  compareFn(c1: TPOWorkOrder, c2: TPOWorkOrder): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  ngOnInit(): void {
    this.apiService.getAllTpoWordOrders().subscribe({
      next: response => {
        this.tpoWorkOrders = response;
        // remove all element that already exist in data.wk
        this.tpoWorkOrders = this.tpoWorkOrders.filter(t => !this.data.failureTpoWorkOrders.some(value => value.id === t.id));
        this.tpoWorkOrders = this.tpoWorkOrders.filter(t => (this.data.wk.id !== t.id));
        this.tpoWorkOrders = [...this.tpoWorkOrders, ...this.data.wk.linkedList];
        // console.log(this.data.failureTpoWorkOrders);
        // this.tpoWorkOrders = this.tpoWorkOrders.filter(t => !this.data.failureTpoWorkOrders.some(value => value.id === t.id));
      },
      error: error => {
        this.hasError = true;
        this.errorMessage = error.message;
      }
    });
  }

  onChangeAction($event: Array<TPOWorkOrder>) {
    // console.log($event);
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
    this.apiService.addTpoWordOrderFailuresToWK(this.data.wk.id, this.tpoWorkSelected).subscribe({
      next: response => {
        this.isLoading = false;
        this._snackBar.openFromComponent(ToastMessageComponent, {
          data: "Work order failure added successfully!",
          duration: 30000,
          panelClass: ['bg-success']
        });
        // todo: SHow snackbar message
        this.data.wk.linkedList = this.tpoWorkSelected;
        this.dialogRef.close(this.data.wk);
      },
      error: error => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = error.message;
        this._snackBar.openFromComponent(ToastMessageComponent, {
          data: error.message ? error.message : "Something wrong!",
          duration: 30000,
          panelClass: ['bg-danger']
        });
      }
    });
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
}
