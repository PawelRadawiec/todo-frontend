import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/state/app.state';
import { ProjectSearchRequest } from 'src/app/store/project/project.actions';
import { ProjectFilter } from '../models/project.model';


@Injectable()
export class ProjectListResolver implements Resolve<any> {

    constructor(private store: Store<State>) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        this.store.dispatch(new ProjectSearchRequest(new ProjectFilter()));
    }

}
