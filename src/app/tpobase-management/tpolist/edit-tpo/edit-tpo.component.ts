import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose, MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TPOData } from "../../../models/tpodata";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule } from "@angular/material/select";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ApiService } from '../../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-tpo',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    AsyncPipe, NgForOf, MatProgressSpinnerModule, NgIf,
    MatSlideToggleModule
  ],
  templateUrl: './edit-tpo.component.html',
  styleUrl: './edit-tpo.component.scss'
})
export class EditTpoComponent {

  form = this.formBuilder.group({
    tpo: ['', [Validators.required]],
    verb: ['', [Validators.required]],
    tpoCondition: [''],
    description: [''],
    critical: [false],
  });

  tpoData: TPOData = new TPOData();
  isEdit = false;
  diagTitle = 'Add TPO';
  isLoading = false;
  errorMessage = "";
  hasError = false;

  constructor(public dialogRef: MatDialogRef<EditTpoComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: TPOData,
    private apiService: ApiService) {
    if (data) {
      this.isEdit = true;
      this.diagTitle = 'Edit TPO';
      this.tpoData = data;
      this.form.patchValue(data);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    this.isLoading = true;
    if (this.isEdit) {
      this.apiService.updateTpoData(this.data.id, this.form.value).subscribe({
        next: response => {
          this.dialogRef.close(response);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false
          this.hasError = true;
          this.errorMessage = error.message;
        }
      });
    } else {
      this.apiService.createTpoData(this.form.value).subscribe({
        next: response => {
          this.dialogRef.close(response);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false
          this.hasError = true;
          this.errorMessage = error.message;
        }
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
