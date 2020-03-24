import { ProjectState } from '../state/app.state';
import * as projectActions from '../project/project.actions';

export const initialState: ProjectState = {
  project: null,
  projects: null,
  projectId: null
};

export function reducer(state = initialState, action: projectActions.ProjectActions) {
  switch (action.type) {
    case projectActions.CREATE_RESPONSE: {
      return {
        ...state,
        project: action.response
      };
    }

    case projectActions.SEARCH_RESPONSE: {
      return {
        ...state,
        projects: action.response
      };
    }

    case projectActions.GET_BY_ID_RESPONSE: {
      return {
        ...state,
        project: action.response
      };
    }

    case projectActions.SET_PROJECT_ID: {
      return {
        ...state,
        projectId: action.projectId
      };
    }

  }
  return state;
}
