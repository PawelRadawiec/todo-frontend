import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../store/state/app.state';
import { SearchRequest } from 'src/app/store/todos/todos.actions';
import { TodoFilter } from 'src/app/shared/models/todo.model';
import { AddTodoComponent } from 'src/app/modules/todo/components/add-todo/add-todo.component';
import { AddProjectComponent } from 'src/app/modules/project/components/add-project/add-project.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  projectId: string;
  description: string;
  sortBy: string;
  _opened: boolean = false;
  @ViewChild(AddTodoComponent) childTodo: AddTodoComponent;
  @ViewChild(AddProjectComponent) childProject: AddProjectComponent;

  constructor(
    private store: Store<State>
  ) {
  }

  ngOnInit() {
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  search() {
    const filter = new TodoFilter();
    filter.description = this.description;
    filter.sortBy = this.sortBy;
    this.store.dispatch(new SearchRequest(filter));
  }

  openTodoModal() {
    this.childTodo.open();
  }

  openProjectModal() {
    this.childProject.open();
  }


}
