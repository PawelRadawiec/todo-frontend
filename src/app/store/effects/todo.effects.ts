import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TodoService } from 'src/app/shared/service/todo/todo.service';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';
import * as todoActions from '../actions/todos.actions';


@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) { }


  @Effect()
  searchRequest: Observable<Action> = this.actions$.pipe(
    ofType(todoActions.SEARCH_REQUEST),
    switchMap(() => {
      return this.todoService.getAllTodos()
        .pipe(
          map((todos) => {
            return new todoActions.SearchResponse(todos)
          })
        )
    })
  )

}

