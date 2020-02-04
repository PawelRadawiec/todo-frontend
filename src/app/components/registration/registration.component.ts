import { Component, OnInit } from '@angular/core';
import { SystemUser } from '../models/system-user.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/state/app.state';
import { RegistrationRequest } from 'src/app/store/system-user/system-user.actions';
import { NgForm, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  request: SystemUser;
  signupForm: FormGroup;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.request = new SystemUser();
    this.initSignupForm();
  }

  onSubmit() {
    this.store.dispatch(new RegistrationRequest(new SystemUser(this.signupForm.value)));
  }

  initSignupForm() {
    this.signupForm = new FormGroup({
      'firstName': new FormControl(null),
      'lastName': new FormControl(null),
      'email': new FormControl(null),
      'login': new FormControl(null),
      'password': new FormControl(null),
    });
  }


}
