import {Component, Inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {TPOData} from "../../../../models/tpodata";
import {ApiService} from "../../../../services/api.service";

@Component({
  selector: 'app-add-work-order',
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
    AsyncPipe, NgForOf, MatProgressSpinnerModule, NgIf
  ],
  templateUrl: './add-work-order.component.html',
  styleUrl: './add-work-order.component.scss'
})
export class AddWorkOrderComponent {

  form = this.formBuilder.group({
    tpo: ['', [Validators.required]],
    verb: ['', [Validators.required]],
    tpoCondition: [''],
    description: [''],
    critical: [false],
  });

  tpoData: TPOData;
  isEdit = false;
  diagTitle = 'Add work order';
  isLoading = false;
  errorMessage = "";
  hasError = false;

  constructor(public dialogRef: MatDialogRef<AddWorkOrderComponent>,
              public formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: TPOData,
              private apiService: ApiService) {
    if (data) {
      this.isEdit = true;
      this.diagTitle = 'Edit work order';
      this.tpoData = data;
      this.form.patchValue(data);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }}

}
