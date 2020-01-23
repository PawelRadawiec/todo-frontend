import {Todo} from '../../components/models/todo.model';
import {
  ActionReducerMap, MetaReducer
} from '@ngrx/store';
import * as fromTodoReducer from '../todos/todo.reducer';
import { environment } from '../../../environments/environment';

export interface State {
  userName?: string;
  todoState: TodoState;
}

export interface TodoState {
  todos: Todo[],
  todoById: Todo,
  editResponse: Todo
}

// export interface State {
//   todoState: TodoState;
// }

export const reducers: ActionReducerMap<State> = {
  todoState: fromTodoReducer.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];