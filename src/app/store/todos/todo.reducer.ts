import * as todoActions from './todos.actions';
import {Todo} from 'src/app/components/models/todo.model';

export interface State {
  userName?: string;
}

export const todoFeatureKey = 'todo';

export interface State {
  todos: Todo[],
  todoById: Todo,
  editResponse: Todo
}

export const initialState: State = {
  todos: [],
  todoById: null,
  editResponse: null
};

export function reducer(state = initialState, action: todoActions.TodoActions): State {
  switch (action.type) {
    case todoActions.SEARCH_RESPONSE: {
      return {
        ...state,
        todos: action.response
      };
    }
    case todoActions.GET_BY_ID_RESPONSE: {
      return {
        ...state,
        todoById: action.response
      };
    }
    case todoActions.EDIT_RESPONSE: {
      return {
        ...state,
        editResponse: action.response
      };
    }

    default:
      return state;
  }
}
