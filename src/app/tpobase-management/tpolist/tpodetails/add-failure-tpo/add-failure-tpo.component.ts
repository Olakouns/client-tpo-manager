import { Component, Inject, OnInit } from '@angular/core';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { TPOData } from '../../../../models/tpodata';
import { ApiService } from '../../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastMessageComponent } from '../../../toast-message/toast-message.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TpoFailureState } from '../../../../models/tpo-failure-state';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-failure-tpo',
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
    MatProgressSpinnerModule,
    NgIf,
    NgForOf,
    AsyncPipe,
    NgxMatSelectSearchModule,
  ],
  templateUrl: './add-failure-tpo.component.html',
  styleUrl: './add-failure-tpo.component.scss',
})
export class AddFailureTpoComponent implements OnInit {
  public filteredTpo: ReplaySubject<TPOData[]> = new ReplaySubject<TPOData[]>(
    1
  );
  tPOData: TPOData[];

  form: FormGroup ;

  isEdit = false;
  diagTitle = 'Add Failure TPO';
  isLoading = false;
  errorMessage = '';
  hasError = false;
  protected _onDestroy = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: TpoFailureState,
    public dialogRef: MatDialogRef<AddFailureTpoComponent>
  ) {
    if (this.data.id != null) {
      this.isEdit = true;
      this.diagTitle = 'Edit TPO Failure State';
    }
    
    this.form = this.formBuilder.group({
      tpo: [this.data?.tpoFailureId ?? ''],
      tpoFilter: ['', []],
    });
  }

  ngOnInit(): void {
    this.getData();

    this.form.controls['tpoFilter'].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterTpo();
      });
  }

  getData() {
    this.apiService.getAllTpoData().subscribe({
      next: (response) => {
        this.tPOData = response;
        this.filteredTpo.next(this.tPOData.slice());
      },
      error: (error) => {
        this._snackBar.openFromComponent(ToastMessageComponent, {
          data: error.message ? error.message : 'Something wrong!',
          duration: 5000,
          panelClass: ['bg-danger'],
        });
      },
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.isEdit) {
      this.data.tpoFailureId = this.form.value.tpo;
      this.apiService.updateFailureTpo(this.data.id, this.data.tpoId, this.data).subscribe({
        next: response => {
          this._snackBar.openFromComponent(ToastMessageComponent, {
            data: "TPO Failure State updated successfully",
            duration: 5000,
            panelClass: ['bg-success']
          });
          this.dialogRef.close(response);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage = error.message;
        }
      });
    } else {
      this.data.tpoFailureId = this.form.value.tpo;
      this.apiService.addFailureTpo(this.data.tpoId, this.data).subscribe({
        next: response => {
          this._snackBar.openFromComponent(ToastMessageComponent, {
            data: "TPO Failure State added successfully",
            duration: 5000,
            panelClass: ['bg-success']
          });
          this.dialogRef.close(response);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage = error.message;
        }
      });
    }
  }

  protected filterTpo() {
    if (this.tPOData == null || this.tPOData.length == 0) {
      return;
    }
    let search = this.form.controls['tpoFilter'].value;
    search = search.toLowerCase();
    this.filteredTpo.next(
      this.tPOData.filter((tpo) => tpo.tpo.toLowerCase().indexOf(search) > -1)
    );
  }
}
