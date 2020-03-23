import * as authorizationActions from './authorization.actions';
import {AuthorizationState} from '../state/app.state';

export const initialState: AuthorizationState = {
  isAuthenticated: false
};

export function reducer(state = initialState, action: authorizationActions.AuthorizationActions) {
  switch (action.type) {
    case authorizationActions.AUTHENTICATION_RESPONSE: {
      return {
        ...state,
        isAuthenticated: true
      };
    }
    case authorizationActions.AUTHENTICATION_CLEAR: {
      return {
        ...state,
        isAuthenticated: false
      };
    }
  }

  return state;
}
