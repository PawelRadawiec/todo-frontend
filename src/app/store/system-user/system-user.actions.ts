import {Action} from '@ngrx/store';
import {SystemUser} from 'src/app/components/models/system-user.model';
import {HttpErrorResponse} from '@angular/common/http';

export const REGISTRATION_RQUEST = '[SystemUser] RegistrationRequest';
export const REGISTRATION_RESPONSE = '[SystemUser] RegistrationResponse';
export const ERROR_RESPONSE = '[SystemUser] RegistrationErrorResponse';

export class RegistrationRequest implements Action {
  readonly type = REGISTRATION_RQUEST;

  constructor(public request: SystemUser) {

  }
}

export class RegistrationResponse implements Action {
  readonly type = REGISTRATION_RESPONSE;

  constructor(public response: SystemUser) {

  }
}

export class RegistrationErrorResponse implements Action {
  readonly type = ERROR_RESPONSE;

  constructor(public response: HttpErrorResponse) {

  }
}

export type SystemUserActions = RegistrationRequest
  | RegistrationResponse
  | RegistrationErrorResponse;
