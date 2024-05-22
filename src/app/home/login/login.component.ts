import {Component} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {LoginService} from "../../services/login.service";
import { Router } from '@angular/router';

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
              private apiService: LoginService, private router : Router) {
  }

  onSubmit() {
    this.isLoading = true;
    this.apiService.login(this.form.value).subscribe({
      next: response => {
        this.isLoading = false;
        this.hasError = false;
        this.router.navigateByUrl('tpo-management');
      },
      error: err => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = err.errorMessage ? err.errorMessage : "Check your username and password";
      }
    });
  }
}
