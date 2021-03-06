import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TodoService } from 'src/app/shared/service/todo/todo.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, concatMap, catchError } from 'rxjs/operators';

import * as todoActions from './todos.actions';
import * as errorActions from '../errors/error.actions';
import { TodoFilter } from 'src/app/shared/models/todo.model';

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
            return new todoActions.SearchResponse(todos);
          })
        );
    })
  );

  @Effect()
  getTodoListByProjectId: Observable<Action> = this.actions$.pipe(
    ofType(todoActions.PROJECT_TODO_LIST_REQUEST),
    switchMap((action: todoActions.GetProjectTodoListRequest) => {
      return this.todoService.getByProjectId(action.id)
        .pipe(
          map((todos) => {
            return new todoActions.GetProjectTodoListResponse(todos);
          }),
          catchError((errors) => {
            return of(new errorActions.ErrorResponse(errors));
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
    switchMap((action: todoActions.TodoEditRequest) => {
      return this.todoService.editTodo(action.request)
        .pipe(
          switchMap(todo => [
            new todoActions.TodoEditResponse(todo),
            new todoActions.GetProjectTodoListRequest(action.request.project.id)
          ]),
          catchError((errors) => {
            return of(new errorActions.ErrorResponse(errors));
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

