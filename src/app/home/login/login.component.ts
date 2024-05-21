import {Component, Inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatProgressSpinner, MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgIf} from "@angular/common";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  hide = true;

  isLoading = false;
  errorMessage = "";
  hasError = false;

  constructor(public formBuilder: FormBuilder,
              private apiService: LoginService) {
  }

  onSubmit() {
    this.isLoading = true;
    this.apiService.login(this.form.value).subscribe({
      next: response => {
        this.isLoading = false;
        this.hasError = false;
      },
      error: err => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = err.errorMessage ? err.errorMessage : "Check your username and password";
      }
    });
  }
}
