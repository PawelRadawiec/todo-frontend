import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemUser } from 'src/app/components/models/system-user.model';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { SysteUserService } from 'src/app/shared/service/syste-user.service';
import * as systemUserActions from './system-user.actions';
import { switchMap, map } from 'rxjs/operators';

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
                        return new systemUserActions.RegistrationResponse(systemUser)
                    })
                );
        })
    )

}