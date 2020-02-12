import {Todo} from '../../components/models/todo.model';
import {
  ActionReducerMap, MetaReducer
} from '@ngrx/store';
import * as fromTodoReducer from '../todos/todo.reducer';
import * as fromSystemUserReducer from '../system-user/system-user.reducer';
import * as fromErrorReducer from '../errors/error.reducer';
import {environment} from '../../../environments/environment';
import {SystemUser} from 'src/app/components/models/system-user.model';
import {HttpErrorResponse} from '@angular/common/http';

export interface State {
  userName?: string;
  todoState: TodoState;
  systemUserState: SystemUserState;
  errorState: ErrorsState;
}

export interface TodoState {
  todos: Todo[];
  todoById: Todo;
  editResponse: Todo;
}

export interface SystemUserState {
  registered: SystemUser;
  accountActive: boolean;
}

export interface ErrorsState {
  error: HttpErrorResponse;
}

export const reducers: ActionReducerMap<State> = {
  todoState: fromTodoReducer.reducer,
  systemUserState: fromSystemUserReducer.reducer,
  errorState: fromErrorReducer.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
