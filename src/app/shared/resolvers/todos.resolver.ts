import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { State } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as projectActions from '../../store/project/project.actions';
import { take, tap, switchMap } from 'rxjs/operators';
import { selectProject } from 'src/app/store/selectors/project.selector';


@Injectable()
export class TodosResolver implements Resolve<any> {

    constructor(
        private store: Store<State>
    ) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.getProject(route.params.projectId)
            .pipe(
                switchMap(() => of(true))
            );
    }

    getProject(projectId: number): Observable<any> {
        return this.store
            .select(selectProject)
            .pipe(
                tap(() => {
                    this.store.dispatch(new projectActions.ProjectByIdRequest(projectId));
                }),
                take(1)
            );
    }


}