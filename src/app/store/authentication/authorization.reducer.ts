import * as authorizationActions from './authorization.actions';
import {AuthorizationState} from '../state/app.state';

export const initialState: AuthorizationState = {
  user: null
};

export function reducer(state = initialState, action: authorizationActions.AuthorizationActions) {
  switch (action.type) {
    case authorizationActions.AUTHENTICATION_RESPONSE: {
      return {
        ...state,
        user: action.response.user
      };
    }
  }

  return state;
}
