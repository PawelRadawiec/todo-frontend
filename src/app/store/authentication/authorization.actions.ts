import {Action} from '@ngrx/store';
import {TokenResponse} from './model/token-response';

export const AUTHENTICATION_REQUEST = '[Authentication] AuthenticationRequest';
export const AUTHENTICATION_RESPONSE = '[Authentication] AuthenticationResponse';
export const AUTHENTICATION_CLEAR = '[Authentication] AuthenticationClear';

export class AuthenticationRequest implements Action {
  readonly type = AUTHENTICATION_REQUEST;

  constructor(public login: string, public password: string) {

  }

}

export class AuthenticationResponse implements Action {
  readonly type = AUTHENTICATION_RESPONSE;

  constructor(public response: TokenResponse) {

  }
}

export class AuthenticationClear implements Action {
  readonly type = AUTHENTICATION_CLEAR;
}

export type AuthorizationActions = AuthenticationRequest
  | AuthenticationResponse
  | AuthenticationClear;
