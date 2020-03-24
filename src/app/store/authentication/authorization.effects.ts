import {Injectable} from '@angular/core';
import {AUTH_USER, AuthenticationService, TOKEN} from '../../shared/service/authentication.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as authActions from './authorization.actions';
import {map, switchMap, tap} from 'rxjs/internal/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthorizationEffects {

  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthenticationService
  ) {

  }

  @Effect()
  authorizationRequest = this.actions$.pipe(
    ofType(authActions.AUTHENTICATION_REQUEST),
    switchMap((action: authActions.AuthenticationRequest) =>
      this.authService.authorizationRequest(action.login, action.password)
    ),
    map(response => {
      sessionStorage.setItem(AUTH_USER, response.user.login);
      sessionStorage.setItem(TOKEN, `Bearer ${response.token}`);
      return new authActions.AuthenticationResponse(response);
    })
  );

  @Effect({dispatch: false})
  authorizationResponse = this.actions$.pipe(
    ofType(authActions.AUTHENTICATION_RESPONSE),
    tap((action: authActions.AuthenticationResponse) => {
      this.router.navigate(['welcome', action.response.user.login]);
    })
  );


}
