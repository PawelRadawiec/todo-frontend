import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SystemUserState} from '../state/app.state';

export const getSystemUserState = createFeatureSelector<SystemUserState>('systemUserState');

export const selectUserErrors = createSelector(
  getSystemUserState,
  (state: SystemUserState) => state.errors
);

