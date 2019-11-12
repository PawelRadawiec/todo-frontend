import { Action } from '@ngrx/store';
import { Todo } from 'src/app/components/list-todos/list-todos.component';
import * as todoActions from '../actions/todos.actions';
 
export interface State {
  userName?: string;
}

export const todoFeatureKey = 'todo';

export interface State {
  todos: Todo[]
}

export const initialState: State = {
    todos: []
};

export function reducer(state = initialState, action: todoActions.TodoActions): State {
  switch (action.type) {
    case todoActions.SEARCH_RESPONSE: {
      return {
        ...state, 
        todos: action.response
      }
    }
    default:
      return state;
  }
}
