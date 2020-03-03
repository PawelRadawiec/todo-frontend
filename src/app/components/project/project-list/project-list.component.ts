import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/state/app.state';
import { selectProject, selectProjects } from 'src/app/store/selectors/project.selector';
import { Project } from '../../models/project.model';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
@AutoUnsubscribe({arrayName: "subscriptions"})
export class ProjectListComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  projects: Project[];

  constructor(
    private store: Store<State>,
    private router: Router,
    ) {
    this.subscriptions.push(
      this.store.select(selectProjects).subscribe((projects) => {
        this.projects = projects;
      })
    )
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  projectDetails(projectId: number) {
    this.router.navigate([`project/${projectId}/todos`]);
  }


}
