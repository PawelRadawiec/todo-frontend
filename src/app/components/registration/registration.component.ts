import { Component, OnInit } from '@angular/core';
import { SystemUser } from '../models/system-user.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/state/app.state';
import { RegistrationRequest } from 'src/app/store/system-user/system-user.actions';
import { NgForm } from '@angular/forms';
import * as userActions from '../../store/system-user/system-user.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  request: SystemUser = new SystemUser();

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(new RegistrationRequest(new SystemUser(form.value)));
  }

}
