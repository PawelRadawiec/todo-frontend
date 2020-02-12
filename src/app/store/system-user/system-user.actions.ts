import {Action} from '@ngrx/store';
import {SystemUser} from 'src/app/components/models/system-user.model';

export const REGISTRATION_RQUEST = '[SystemUser] RegistrationRequest';
export const REGISTRATION_RESPONSE = '[SystemUser] RegistrationResponse';
export const ACTIVATION_REQUEST = '[SystemUser] ActivtionRequest';
export const ACTIVATION_RESPONSE = '[SystemUser] ActivationResponse';


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

export class ActivtionRequest implements Action {
  readonly type = ACTIVATION_REQUEST;

  constructor(public activationCode: string) {

  }
}

export class ActivationResponse implements Action {
  readonly type = ACTIVATION_RESPONSE;
  constructor(public response: boolean) {

  }
}

export type SystemUserActions = RegistrationRequest
  | RegistrationResponse
  | ActivtionRequest
  | ActivationResponse;
