import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../store/state/app.state';
import {SearchRequest} from 'src/app/store/todos/todos.actions';
import {TodoFilter} from '../models/todo.model';
import {AddTodoComponent} from '../add-todo/add-todo.component';
import {AddProjectComponent} from '../add-project/add-project.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  description: string;
  sortBy: string;
  @ViewChild(AddTodoComponent) childTodo: AddTodoComponent;
  @ViewChild(AddProjectComponent) childProject: AddProjectComponent;


  constructor(
    private store: Store<State>
  ) {
  }

  ngOnInit() {
  }

  _opened: boolean = false;

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
