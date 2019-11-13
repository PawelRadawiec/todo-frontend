import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTodo from '../todos/todo.reducer';


export interface State {

  [fromTodo.todoFeatureKey]: fromTodo.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromTodo.todoFeatureKey]: fromTodo.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
