import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { State } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ofType, Actions } from '@ngrx/effects';
import { take } from 'rxjs/operators';
import * as todoActions from '../../store/todos/todos.actions';


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
        this.store.dispatch(new todoActions.GetProjectTodoListRequest(projectId));
        return this.actions$.pipe(
            ofType(todoActions.PROJECT_TODO_LIST_RESPONSE),
            take(1)
        );
    }


}