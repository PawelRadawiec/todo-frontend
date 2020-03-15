import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store/state/app.state';
import { RegistrationRequest } from 'src/app/store/system-user/system-user.actions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { selectRegisteredUser } from 'src/app/store/selectors/system-user.selector';
import { SystemUser } from 'src/app/shared/models/system-user.model';
import { ErrorComponent } from 'src/app/components/error/error.component';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent extends ErrorComponent implements OnInit, OnDestroy {
  request: SystemUser;
  signUpForm: FormGroup;
  registered: SystemUser;
  protected subscriptions: Subscription[] = [];

  constructor(
    protected store: Store<State>,
    private formBuilder: FormBuilder
  ) {
    super(store);
    this.subscriptions.push(
      this.store.pipe(select(selectRegisteredUser)).subscribe(registered => {
        this.registered = registered;
      })
    );
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
