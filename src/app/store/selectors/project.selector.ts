import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProjectState} from '../state/app.state';

export const getProjectState = createFeatureSelector<ProjectState>('projectState');

export const selectProject = createSelector(
  getProjectState,
  (state: ProjectState) => state.project
);

export const selectProjects = createSelector(
  getProjectState,
  (state: ProjectState) => state.projects
);

export const selectProjectId = createSelector(
  getProjectState,
  (state: ProjectState) => state.projectId
);
