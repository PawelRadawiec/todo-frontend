import {Injectable} from '@angular/core';
import {Actions, ofType, Effect} from '@ngrx/effects';
import {SysteUserService} from 'src/app/shared/service/syste-user.service';
import * as systemUserActions from './system-user.actions';
import * as errorActions from '../errors/error.actions';
import {switchMap, map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';


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


}
