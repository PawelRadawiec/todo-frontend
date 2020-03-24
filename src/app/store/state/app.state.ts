import {
  ActionReducerMap, MetaReducer
} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import * as fromTodoReducer from '../todos/todo.reducer';
import * as fromSystemUserReducer from '../system-user/system-user.reducer';
import * as fromErrorReducer from '../errors/error.reducer';
import * as fromProjectReducer from '../project/project.reducer';
import * as fromAuthorizationReducer from '../authentication/authorization.reducer';
import {Todo} from 'src/app/shared/models/todo.model';
import {SystemUser} from 'src/app/shared/models/system-user.model';
import {Project} from 'src/app/shared/models/project.model';

export interface State {
  userName?: string;
  todoState: TodoState;
  systemUserState: SystemUserState;
  projectState: ProjectState;
  errorState: ErrorsState;
  authorizationState: AuthorizationState;
}

export interface TodoState {
  todos: Todo[];
  todoById: Todo;
  editResponse: Todo;
  createResponse: Todo;
  projectTodoList: Todo[];
}

export interface SystemUserState {
  registered: SystemUser;
  accountActive: boolean;
}

export interface ErrorsState {
  error: HttpErrorResponse;
}

export interface ProjectState {
  projects: Project[];
  project: Project;
  projectId: number;
}

export interface AuthorizationState {
  isAuthenticated: boolean;
}

export const reducers: ActionReducerMap<State> = {
  todoState: fromTodoReducer.reducer,
  systemUserState: fromSystemUserReducer.reducer,
  projectState: fromProjectReducer.reducer,
  errorState: fromErrorReducer.reducer,
  authorizationState: fromAuthorizationReducer.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
