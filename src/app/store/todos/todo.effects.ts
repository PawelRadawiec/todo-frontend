import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TodoService } from 'src/app/shared/service/todo/todo.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, concatMap, catchError } from 'rxjs/operators';
import { TodoFilter } from 'src/app/components/models/todo.model';

import * as todoActions from './todos.actions';
import * as errorActions from '../errors/error.actions';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {
  }


  @Effect()
  searchRequest: Observable<Action> = this.actions$.pipe(
    ofType(todoActions.SEARCH_REQUEST),
    switchMap((action: todoActions.SearchRequest) => {
      return this.todoService.getAllTodos(action.filter)
        .pipe(
          map((todos) => {
            return new todoActions.SearchResponse(todos)
          })
        );
    })
  );

  @Effect()
  getByIdRequest: Observable<Action> = this.actions$.pipe(
    ofType(todoActions.GET_BY_ID_REQUEST),
    concatMap((action: todoActions.TodoGetByIdRequest) => {
      return this.todoService.getById(action.id)
        .pipe(
          map((todo) => {
            return new todoActions.TodoGetByIdResponse(todo);
          })
        );
    })
  );

  @Effect()
  createRequest = this.actions$.pipe(
    ofType(todoActions.CREATE_REQUEST),
    concatMap((action: todoActions.CreateTodoRequest) =>
      this.todoService.saveTodo(action.request)
        .pipe(
          concatMap((todo) => ([
              new todoActions.CreateTodoResponse(todo)
          ])),
          catchError((errors) => {
            return of(new errorActions.ErrorResponse(errors));
          })
        )
    )
  );

  @Effect()
  editTodoRequest: Observable<Action> = this.actions$.pipe(
    ofType(todoActions.EDIT_REQUEST),
    concatMap((action: todoActions.TodoEditRequest) => {
      return this.todoService.editTodo(action.request)
        .pipe(
          map((todo) => {
            return new todoActions.TodoEditResponse(todo);
          })
        );
    })
  );

  @Effect()
  deleteTodoRequest: Observable<Action> = this.actions$.pipe(
    ofType(todoActions.DELETE_BY_ID),
    concatMap((action: todoActions.TodoDeleteById) => {
      return this.todoService.delete(action.todoId)
        .pipe(
          map(() => {
            return new todoActions.SearchRequest(new TodoFilter());
          })
        );
    })
  );

}

