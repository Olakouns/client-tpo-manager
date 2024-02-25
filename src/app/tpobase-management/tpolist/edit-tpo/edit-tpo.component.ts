import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose, MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TPOData} from "../../../models/tpodata";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

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
    isCritical: [false],
  });

  tpoData: TPOData = new TPOData();
  isEdit = false;
  diagTitle = 'Add TPO';
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<EditTpoComponent>, public formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: TPOData) {
    if (data) {
      this.isEdit = true;
      this.diagTitle = 'Edit TPO';
      this.tpoData = data;
      this.form.patchValue(data);
    }
  }

  onSubmit() {
    console.log(this.form.value)
  }

  onClose() {
    this.dialogRef.close();
  }
}
