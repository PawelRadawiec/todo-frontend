import {Action} from '@ngrx/store';
import {Todo} from 'src/app/components/models/todo.model';

export const SEARCH_REQUEST = '[Todo] SearchRequest';
export const SEARCH_RESPONSE = '[Todo] SearchResponse';
export const GET_BY_ID_REQUEST = '[Todo] TodoGetByIdRequest';
export const GET_BY_ID_RESPONSE = '[Todo] TodoGetByIdResponse';
export const CREATE_REQUEST = '[Todo] CreateTodoRequest';
export const CREATE_RESPONSE = '[Todo] CreateTodoResponse';


export class SearchRequest implements Action {
  readonly type = SEARCH_REQUEST;
}

export class SearchResponse implements Action {
  readonly type = SEARCH_RESPONSE;

  constructor(public response: Todo[]) {

  }
}

export class TodoGetByIdRequest implements Action {
  readonly type = GET_BY_ID_REQUEST;

  constructor(public id: number) {

  }
}

export class TodoGetByIdResponse implements Action {
  readonly type = GET_BY_ID_RESPONSE;

  constructor(public response: Todo) {

  }
}

export class CreateTodoRequest implements Action {
  readonly type = CREATE_REQUEST;

  constructor(public request: Todo) {

  }
}

export class CreateTodoResponse implements Action {
  readonly type = CREATE_RESPONSE;

  constructor(public response: Todo) {

  }
}


export type TodoActions = SearchRequest
  | SearchResponse
  | TodoGetByIdRequest
  | TodoGetByIdResponse
  | CreateTodoRequest
  | CreateTodoResponse;
