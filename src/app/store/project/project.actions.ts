import { Action } from '@ngrx/store';
import { Project, ProjectFilter } from 'src/app/shared/models/project.model';

export const CREATE_REQUEST = '[Project] ProjectCreateRequest';
export const CREATE_RESPONSE = '[Project] ProjectCreateResponse';
export const SEARCH_REQUEST = '[Project] ProjectSearchRequest';
export const SEARCH_RESPONSE = '[Project] ProjectSearchResponse';
export const GET_BY_ID_REQUEST = '[Project] ProjectByIdRequest';
export const GET_BY_ID_RESPONSE = '[Project] ProjectByIdResponse';
export const SET_PROJECT_ID = '[Project] ProjectSetId';


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

export class ProjectByIdRequest implements Action {
  readonly type = GET_BY_ID_REQUEST;
  constructor(public projectId: number) {

  }
}

export class ProjectByIdResponse implements Action {
  readonly type = GET_BY_ID_RESPONSE;
  constructor(public response: Project) {

  }
}

export class ProjectSetId implements Action {
  readonly type = SET_PROJECT_ID;

  constructor(public projectId: number) {

  }
}


export type ProjectActions = ProjectCreateRequest
  | ProjectCreateResponse
  | ProjectSearchRequest
  | ProjectSearchResponse
  | ProjectByIdRequest
  | ProjectByIdResponse
  | ProjectSetId;
