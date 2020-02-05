import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';


export const ERROR_RESPONSE = '[Error] ErrorResponse';

export class ErrorResponse implements Action {
  readonly type = ERROR_RESPONSE;

  constructor(public response: HttpErrorResponse) {

  }
}

export type ErrorActions = ErrorResponse;
