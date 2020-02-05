import {Component, OnDestroy, OnInit} from '@angular/core';
import {SystemUser} from '../models/system-user.model';
import {Store} from '@ngrx/store';
import {State} from 'src/app/store/state/app.state';
import {RegistrationRequest} from 'src/app/store/system-user/system-user.actions';
import {FormGroup, FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {selectUserErrors} from '../../store/selectors/system-user.selector';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
@AutoUnsubscribe()
export class RegistrationComponent implements OnInit, OnDestroy {
  request: SystemUser;
  signupForm: FormGroup;
  errors: HttpErrorResponse;
  protected subscriptions: Subscription[] = [];

  constructor(private store: Store<State>) {
    this.subscriptions.push(
      store.select(selectUserErrors).subscribe(errors => {
        if (errors) {
          this.errors = errors;
          this.initErrorMessages();
        }
      })
    );
  }

  ngOnInit() {
    this.request = new SystemUser();
    this.initSignupForm();
  }

  ngOnDestroy() {

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

  initErrorMessages() {
    const validationErrors = this.errors.error;
    Object.entries(validationErrors).forEach(
      ([key, value]) => {
        const formControl = this.signupForm.get(key);
        if (formControl) {
          formControl.setErrors({
            serverError: value
          });
        }
      }
    );
  }

  containError(field: string) {
    const formControl = this.signupForm.get(field);
    return (
      formControl
      && formControl.errors
      && ![null, undefined].includes(formControl.errors.serverError)
    );
  }

  errorMessage(field: string) {
    const formControl = this.signupForm.get(field);
    if (this.containError(field)) {
      return formControl.errors.serverError;
    }
  }


}
