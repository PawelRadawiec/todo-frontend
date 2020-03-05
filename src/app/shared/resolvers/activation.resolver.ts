import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/state/app.state';
import { ActivtionRequest } from 'src/app/store/system-user/system-user.actions';

@Injectable()
export class ActivationResolver implements Resolve<any> {

    constructor(private store: Store<State>) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        const activationCode = route.params.activationCode;
        if (activationCode) {
            this.store.dispatch(new ActivtionRequest(activationCode));
        }
    }

    
}