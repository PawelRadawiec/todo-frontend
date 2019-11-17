import * as todoActions from './todos.actions';
import {Todo} from 'src/app/components/models/todo.model';

export interface State {
  userName?: string;
}

export const todoFeatureKey = 'todo';

export interface State {
  todos: Todo[],
  todo: Todo
}

export const initialState: State = {
  todos: [],
  todo: null
};

export function reducer(state = initialState, action: todoActions.TodoActions): State {
  switch (action.type) {
    case todoActions.SEARCH_RESPONSE: {
      return {
        ...state,
        todos: action.response
      }
    }
    case todoActions.GET_BY_ID_RESPONSE: {
      return {
        ...state,
        todo: action.response
      }
    }
    default:
      return state;
  }
}
