import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ErrorsState} from '../state/app.state';

export const getErrorState = createFeatureSelector<ErrorsState>('errorState');

export const selectError = createSelector(
  getErrorState,
  (state: ErrorsState) => state.error
);
