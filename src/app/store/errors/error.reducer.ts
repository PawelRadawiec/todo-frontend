import {ErrorsState} from '../state/app.state';
import * as errorActions from './error.actions';

export const initialState: ErrorsState = {
  error: null
};

export function reducer(state = initialState, action: errorActions.ErrorActions) {
  switch (action.type) {
    case errorActions.ERROR_RESPONSE: {
      return {
        ...state,
        error: action.response
      };
    }
  }
  return state;
}
