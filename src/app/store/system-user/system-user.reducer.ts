import { SystemUserState } from '../state/app.state';
import * as systemUserActions from './system-user.actions'

export const initialState: SystemUserState = {
    registered: null,
    accountActive: null
};

export function reducer(state = initialState, action: systemUserActions.SystemUserActions) {
    switch (action.type) {
        case systemUserActions.REGISTRATION_RESPONSE: {
            return {
                ...state,
                registered: action.response
            };
        }

        case systemUserActions.ACTIVATION_RESPONSE: {
            return {
                ...state,
                accountActive: action.response
            };
        }
    }
    return state;
}
