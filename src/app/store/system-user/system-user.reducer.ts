import { SystemUserState } from '../state/app.state';
import * as systemUserActions from './system-user.actions'

export const innitialState: SystemUserState = {
    registered: null
};

export function reducer(state = innitialState, action: systemUserActions.SystemUserActions) {
    switch (action.type) {
        case systemUserActions.REGISTRATION_RESPONSE: {
            return {
                ...state,
                registered: action.response
            };
        }
    }
    return state;
}