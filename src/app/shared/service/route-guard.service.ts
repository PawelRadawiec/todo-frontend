import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Store} from '@ngrx/store';
import {State} from '../../store/state/app.state';
import * as authActions from '../../store/authentication/authorization.actions';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private store: Store<State>
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn()) {
      this.store.dispatch(new authActions.AuthenticationSuccess());
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }


}
