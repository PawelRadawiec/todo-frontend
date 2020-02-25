import {Action} from '@ngrx/store';
import {Project, ProjectFilter} from 'src/app/components/models/project.model';

export const CREATE_REQUEST = '[Project] ProjectCreateRequest';
export const CREATE_RESPONSE = '[Project] ProjectCreateResponse';
export const SEARCH_REQUEST = '[Project] ProjectSearchRequest';
export const SEARCH_RESPONSE = '[Project] ProjectSearchResponse';

export class ProjectCreateRequest implements Action {
  readonly type = CREATE_REQUEST;

  constructor(public request: Project) {

  }
}

export class ProjectCreateResponse implements Action {
  readonly type = CREATE_RESPONSE;

  constructor(public response: Project) {

  }
}

export class ProjectSearchRequest implements Action {
  readonly type = SEARCH_REQUEST;

  constructor(public filter: ProjectFilter) {

  }
}

export class ProjectSearchResponse implements Action {
  readonly type = SEARCH_RESPONSE;

  constructor(public response: Project[]) {

  }
}

export type ProjectActions = ProjectCreateRequest
  | ProjectCreateResponse
  | ProjectSearchRequest
  | ProjectSearchResponse;
