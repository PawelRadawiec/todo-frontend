import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { SysteUserService } from 'src/app/shared/service/syste-user.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as systemUserActions from './system-user.actions';
import * as errorActions from '../errors/error.actions';


@Injectable()
export class SystemUserEffects {

  constructor(
    private actions$: Actions,
    private systemUserService: SysteUserService
  ) {
  }

  @Effect()
  createRequest = this.actions$.pipe(
    ofType(systemUserActions.REGISTRATION_RQUEST),
    switchMap((action: systemUserActions.RegistrationRequest) => {
      return this.systemUserService.save(action.request)
        .pipe(
          map((systemUser) => {
            return new systemUserActions.RegistrationResponse(systemUser);
          }),
          catchError((errors) => {
            return of(new errorActions.ErrorResponse(errors));
          })
        );
    })
  );

  @Effect()
  activationRequest = this.actions$.pipe(
    ofType(systemUserActions.ACTIVATION_REQUEST),
    switchMap((action: systemUserActions.ActivtionRequest) => {
      return this.systemUserService.activation(action.activationCode)
        .pipe(
          map((active) => {
            return new systemUserActions.ActivationResponse(active);
          }),
          catchError((errors) => {
            return of(new errorActions.ErrorResponse(errors));
          })
        );
    })
  );


}
