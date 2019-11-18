import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TodoService } from 'src/app/shared/service/todo/todo.service';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, concatMap } from 'rxjs/operators';
import * as todoActions from './todos.actions';


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
    switchMap(() => {
      return this.todoService.getAllTodos()
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
          concatMap((todo) => ([]))
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
            return new todoActions.SearchRequest();
          })
        );
    })
  );

}

