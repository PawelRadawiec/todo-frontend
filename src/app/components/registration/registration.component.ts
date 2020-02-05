import {Component, OnDestroy, OnInit} from '@angular/core';
import {SystemUser} from '../models/system-user.model';
import {Store} from '@ngrx/store';
import {State} from 'src/app/store/state/app.state';
import {RegistrationRequest} from 'src/app/store/system-user/system-user.actions';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ErrorComponent} from '../error/error.component';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent extends ErrorComponent implements OnInit, OnDestroy {
  request: SystemUser;
  signUpForm: FormGroup;

  constructor(
    protected store: Store<State>,
    private formBuilder: FormBuilder
  ) {
    super(store);
  }

  ngOnInit() {
    this.request = new SystemUser();
    this.initSignUpForm();
    this.form = this.signUpForm;
  }

  ngOnDestroy() {
  }

  onSubmit() {
    this.store.dispatch(new RegistrationRequest(new SystemUser(this.signUpForm.value)));
  }

  initSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      firstName: [],
      lastName: [],
      email: [],
      login: [],
      password: []
    });
  }


}
