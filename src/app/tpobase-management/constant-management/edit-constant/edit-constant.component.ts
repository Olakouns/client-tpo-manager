import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ConstantConfig } from '../../../models/constant-config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastMessageComponent } from '../../toast-message/toast-message.component';

@Component({
  selector: 'app-edit-constant',
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
    AsyncPipe,
    NgForOf,
    MatProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './edit-constant.component.html',
  styleUrl: './edit-constant.component.scss'
})
export class EditConstantComponent {
  form = this.formBuilder.group({
    keyName: ['', [Validators.required]],
    valueContent: ['', [Validators.required]],
    wsdlDoc: [''],
    description: ['']
  });

  tpoData: ConstantConfig = new ConstantConfig();
  isEdit = false;
  diagTitle = 'Add equipment constant';
  isLoading = false;
  errorMessage = '';
  hasError = false;

  constructor(
    public dialogRef: MatDialogRef<EditConstantComponent>,
    private _snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ConstantConfig,
    private apiService: ApiService
  ) {
    if (data) {
      this.isEdit = true;
      this.diagTitle = 'Edit equipment constant';
      this.tpoData = data;
      this.form.patchValue(data);
    }
  }

  onSubmit() {

  if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.isEdit) {
      this.apiService.updateConstantConfig(this.data.id, this.form.value).subscribe({
        next: (response) => {
          this._snackBar.openFromComponent(ToastMessageComponent, {
            data: 'Equipemtn constant updated successfully!',
            duration: 3000,
            panelClass: ['bg-success'],
          });
          this.dialogRef.close(response);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage = error.message;
        },
      });
    } else {
      this.apiService.createConstantConfig(this.form.value).subscribe({
        next: (response) => {
          this._snackBar.openFromComponent(ToastMessageComponent, {
            data: 'Equipment created successfully!',
            duration: 3000,
            panelClass: ['bg-success'],
          });
          this.dialogRef.close(response);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage = error.message;
        },
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
