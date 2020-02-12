import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SystemUserState } from '../state/app.state';

export const getSystemUserState = createFeatureSelector<SystemUserState>('systemUserState');


export const selectRegisteredUser = createSelector(
    getSystemUserState,
    (state: SystemUserState) => state.registered
);

export const selectActiveAccount = createSelector(
    getSystemUserState,
    (state: SystemUserState) => state.accountActive
);
