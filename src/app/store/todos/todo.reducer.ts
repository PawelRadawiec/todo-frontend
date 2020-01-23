import * as todoActions from './todos.actions';
import {TodoState} from '../state/app.state';


export const initialState: TodoState = {
  todos: [],
  todoById: null,
  editResponse: null
};

export function reducer(state = initialState, action: todoActions.TodoActions): TodoState {
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
