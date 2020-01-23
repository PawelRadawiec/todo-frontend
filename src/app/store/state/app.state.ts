import { Todo } from '../../components/models/todo.model';
import {
  ActionReducerMap, MetaReducer
} from '@ngrx/store';
import * as fromTodoReducer from '../todos/todo.reducer';
import * as fromSystemUserReducer from '../system-user/system-user.reducer';
import { environment } from '../../../environments/environment';
import { SystemUser } from 'src/app/components/models/system-user.model';

export interface State {
  userName?: string;
  todoState: TodoState;
  systemUserState: SystemUserState;
}

export interface TodoState {
  todos: Todo[],
  todoById: Todo,
  editResponse: Todo
}

export interface SystemUserState {
  registered: SystemUser;
}

export const reducers: ActionReducerMap<State> = {
  todoState: fromTodoReducer.reducer,
  systemUserState: fromSystemUserReducer.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];