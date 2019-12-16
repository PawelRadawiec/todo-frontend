import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromState from '../state/app.state';
import * as fromTodoReducer from '../reducers/todo.reducer';


export interface State {

  ['todo']: fromState.TodoState;
}

export const reducers: ActionReducerMap<State> = {
  ['todo']: fromTodoReducer.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
