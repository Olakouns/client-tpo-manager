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
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ApiService} from "../../../../services/api.service";
import {TPOWorkOrder} from "../../../../models/tpowork-order";
import {XmlEditorComponent} from "../../../../home/xml-editor/xml-editor.component";
import {MonacoEditorModule} from "ngx-monaco-editor";
import {HomeModule} from "../../../../home/home.module";

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
    AsyncPipe, NgForOf, MatProgressSpinnerModule, NgIf, MatSelect, XmlEditorComponent, HomeModule
  ],
  templateUrl: './add-work-order.component.html',
  styleUrl: './add-work-order.component.scss'
})
export class AddWorkOrderComponent {

  form = this.formBuilder.group({
    webServiceName: ['', [Validators.required]],
    equipment: ['', [Validators.required]],
    template: ['']
  });

  tpoWorkOrder: TPOWorkOrder;
  isEdit = false;
  diagTitle = 'Add work order';
  isLoading = false;
  errorMessage = "";
  hasError = false;

  editorOptions = {
    theme: 'vs-light',
    language: 'xml',
    lineNumbers: 'off'
  };
  code: string = '<xml>\n  <block type="controls_if"></block>\n</xml>';

  constructor(public dialogRef: MatDialogRef<AddWorkOrderComponent>,
              public formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: {
                tpoId: number,
                workOrder: TPOWorkOrder,
              },
              private apiService: ApiService) {
    if (data?.workOrder) {
      this.isEdit = true;
      this.diagTitle = 'Edit work order';
      this.tpoWorkOrder = data.workOrder;
      this.form.patchValue(data.workOrder);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    this.isLoading = true;

    if (this.isEdit) {
      this.apiService.updateTpoWordOrder(this.tpoWorkOrder.id, this.form.value).subscribe({
        next: response => {
          this.dialogRef.close(response);
        },
        error: (error) => {
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage = error.error.message;
        }
      });
    } else {
      if (this.data?.tpoId) {
        this.apiService.addTpoWordOrder(this.data.tpoId, this.form.value).subscribe({
          next: response => {
            this.dialogRef.close(response);
          },
          error: (error) => {
            this.isLoading = false;
            this.hasError = true;
            this.errorMessage = error.error.message;
          }
        });
      } else {
        this.apiService.addWordOrder(this.form.value).subscribe({
          next: response => {
            this.dialogRef.close(response);
          },
          error: (error) => {
            this.isLoading = false;
            this.hasError = true;
            this.errorMessage = error.error.message;
          }
        });
      }

    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
