import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ApiService } from '../../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-constant',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatProgressSpinner,
    NgIf,
  ],
  templateUrl: './delete-constant.component.html',
  styleUrl: './delete-constant.component.scss',
})
export class DeleteConstantComponent {
  isDeleting = false;
  hasError = false;
  errorMessage = "";

  constructor(public dialogRef: MatDialogRef<DeleteConstantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private apiService: ApiService) {
  }

  onDeleteConstant() {
    this.isDeleting = true;
    this.apiService.deleteConstantConfig(this.data).subscribe({
      next: response => {
        this.isDeleting = false;
        this.dialogRef.close(response);
      },
      error: (error: HttpErrorResponse) => {
        this.isDeleting = false;
        this.hasError = true;
        this.errorMessage = error.message;
      }
    });
  }
}
