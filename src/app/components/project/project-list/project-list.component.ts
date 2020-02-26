import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/state/app.state';
import { selectProject, selectProjects } from 'src/app/store/selectors/project.selector';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private projects: Project[];

  constructor(private store: Store<State>) {
    this.subscriptions.push(
      this.store.select(selectProjects).subscribe((projects) => {
        this.projects = projects;
      })
    )
  }

  ngOnInit() {
  }

}
