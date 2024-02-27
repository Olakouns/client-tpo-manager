import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-delete-tpo',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatProgressSpinner, NgIf],
  templateUrl: './delete-tpo.component.html',
  styleUrl: './delete-tpo.component.scss'
})
export class DeleteTpoComponent {

  isDeleting = false;
  hasError = false;
  errorMessage = "";

  constructor(public dialogRef: MatDialogRef<DeleteTpoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private apiService: ApiService) {
  }

  onDeleteTpo() {
    this.isDeleting = true;

    this.apiService.deleteTpoData(this.data).subscribe({
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
