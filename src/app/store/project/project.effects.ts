import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProjectService} from '../../shared/service/project.service';
import {catchError, map, switchMap} from 'rxjs/internal/operators';

import * as projectActions from '../project/project.actions';
import * as errorActions from '../errors/error.actions';
import {of} from 'rxjs';
import { ProjectFilter } from 'src/app/components/models/project.model';

@Injectable()
export class ProjectEffects {
  
  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) {
  }

  @Effect()
  createRequestEffect = this.actions$.pipe(
    ofType(projectActions.CREATE_REQUEST),
    switchMap((action: projectActions.ProjectCreateRequest) => {
      return this.projectService.save(action.request)
        .pipe(
          map((project) => {
            return new projectActions.ProjectCreateResponse(project);
          }),
          catchError((errors) => {
            return of(new errorActions.ErrorResponse(errors));
          })
        );
    })
  );

  @Effect()
  searchRequest = this.actions$.pipe(
      ofType(projectActions.SEARCH_REQUEST),
      switchMap((action: projectActions.ProjectSearchRequest) => {
        return this.projectService.search(new ProjectFilter())
        .pipe(
          map((response) => {
            return new projectActions.ProjectSearchResponse(response)
          })
        );
      })
  )


}
