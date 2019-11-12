import { createAction, props, Action } from '@ngrx/store';
import { Todo } from 'src/app/components/list-todos/list-todos.component';

export const SEARCH_REQUEST = '[Todo] SearchRequest';
export const SEARCH_RESPONSE = '[Todo] SearchResponse';

export class SearchRequest implements Action {
  readonly type = SEARCH_REQUEST;
}

export class SearchResponse implements Action {
  readonly type = SEARCH_RESPONSE;
  constructor(public response: Todo[]) {

  }
}


export type TodoActions = SearchRequest
  | SearchResponse;