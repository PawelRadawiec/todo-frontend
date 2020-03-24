import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/shared/service/authentication.service';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Store} from '@ngrx/store';
import {State} from '../../../../store/state/app.state';
import * as authorizationActions from '../../../../store/authentication/authorization.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = 'Invalid credentials';
  invalidLogin = false;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    protected store: Store<State>
  ) {
  }

  ngOnInit() {
    this.initLoginForm();
  }

  onSubmit() {
    const formValue = {
      login: this.loginForm.value.login,
      password: this.loginForm.value.password
    };
    this.store.dispatch(new authorizationActions.AuthenticationRequest(formValue.login, formValue.password));
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      login: [],
      password: []
    });
  }


}
