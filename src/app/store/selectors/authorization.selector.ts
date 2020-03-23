import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthorizationState} from '../state/app.state';

export const getAuthState = createFeatureSelector<AuthorizationState>('authorizationState');

export const selectIsAuthenticated = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.isAuthenticated
);
