import { Action } from '@ngrx/store';
import { SystemUser } from 'src/app/components/models/system-user.model';

export const REGISTRATION_RQUEST = '[SystemUser] RegistrationRequest';
export const REGISTRATION_RESPONSE = '[SystemUser] RegistrationResponse';

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

export type SystemUserActions = RegistrationRequest
    | RegistrationResponse