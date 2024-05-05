import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../../services/api.service";
import {TPOWorkOrder} from "../../../../models/tpowork-order";
import {NgIf} from "@angular/common";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-edit-flow',
  standalone: true,
  imports: [
    MatDialogContent,
    NgIf,
    CdkDropList,
    CdkDrag,
    MatButton,
    MatProgressSpinner
  ],
  templateUrl: './edit-flow.component.html',
  styleUrl: './edit-flow.component.scss'
})
export class EditFlowComponent implements OnInit {

  diagTitle = 'Edit tpo work orders flow';
  isLoading = false;
  errorMessage = "";
  hasError = false;
  constructor(public dialogRef: MatDialogRef<EditFlowComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                tpoId: number,
                tpoWorkOrders: Array<TPOWorkOrder>
              },
              private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<TPOWorkOrder[]>) {
    moveItemInArray(this.data.tpoWorkOrders, event.previousIndex, event.currentIndex);
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    this.isLoading = true;
    this.apiService.updateTpoDataPatterns(this.data.tpoId, this.data.tpoWorkOrders).subscribe({
      next: response => {
        this.dialogRef.close(this.data.tpoWorkOrders);
      },
      error: error => {
        this.isLoading = false
        this.hasError = true;
        this.errorMessage = error.message;
      }
    })
  }
}
