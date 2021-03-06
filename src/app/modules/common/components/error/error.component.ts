import { OnDestroy, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { State } from 'src/app/store/state/app.state';
import { selectError } from 'src/app/store/selectors/error.selector';


@AutoUnsubscribe({arrayName: 'subscriptions'})
export class ErrorComponent implements OnInit, OnDestroy {
  protected subscriptions: Subscription[] = [];
  errorResponse: HttpErrorResponse;
  form: FormGroup;

  constructor(
    protected store: Store<State>
  ) {
    this.subscriptions.push(
      store.select(selectError).subscribe(error => {
        if (error) {
          this.errorResponse = error;
          this.initErrorMessages();
        }
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  initErrorMessages() {
    const validationErrors = this.errorResponse.error;
    if (!validationErrors || !this.form) {
      return;
    }
    Object.entries(validationErrors).forEach(
      ([key, value]) => {
        const formControl = this.form.get(key);
        if (formControl) {
          formControl.setErrors({
            serverError: value
          });
        }
      });
  }

  containError(field: string) {
    const formControl = this.form.get(field);
    return (
      formControl
      && formControl.errors
      && ![null, undefined].includes(formControl.errors.serverError)
    );
  }

  errorMessage(field: string) {
    const formControl = this.form.get(field);
    if (this.containError(field)) {
      return formControl.errors.serverError;
    }
  }

}
