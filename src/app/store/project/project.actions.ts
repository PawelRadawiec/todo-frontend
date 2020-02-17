import { Action } from '@ngrx/store';
import { Project } from 'src/app/components/models/project.model';

export const CREATE_REQUEST = '[Project] ProjectCreateRequest';
export const CREATE_RESPONSE = '[Project] ProjectCreateResponse';

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

export type ProjectActions = ProjectCreateRequest
| ProjectCreateResponse;