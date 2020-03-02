import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { State } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as projectActions from '../../store/project/project.actions';
import { ofType, Actions } from '@ngrx/effects';
import { take } from 'rxjs/operators';


@Injectable()
export class TodosResolver implements Resolve<any> {

    constructor(
        private store: Store<State>,
        private actions$: Actions,
    ) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.getProject(route.params.projectId);
    }

    getProject(projectId: number): Observable<any> {
        this.store.dispatch(new projectActions.ProjectByIdRequest(projectId));
           return this.actions$.pipe(
            ofType(projectActions.GET_BY_ID_RESPONSE),
            take(1)
        );
    }


}