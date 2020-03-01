import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from 'src/app/shared/service/basic-authentication.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private errorMessage = 'Invalid credentials';
  private invalidLogin = false;
  private loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: BasicAuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initLoginForm();
  }

  onSubmit() {
    const formValue = {
      login: this.loginForm.value.login,
      password: this.loginForm.value.password
    };
    this.authService.executeJwtAuthService(formValue.login, formValue.password)
      .subscribe(() => {
        this.router.navigate(['welcome', formValue.login])
        this.invalidLogin = false
      },
        error => {
          console.log(error),
            this.invalidLogin = true
        }
      )
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      login: [],
      password: []
    });
  }

}
