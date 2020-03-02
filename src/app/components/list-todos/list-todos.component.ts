import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as todoActions from '../../store/todos/todos.actions';
import { Subscription } from 'rxjs';
import { State } from '../../store/state/app.state';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Todo, TodoFilter } from '../models/todo.model';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { selectProject } from 'src/app/store/selectors/project.selector';


@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
@AutoUnsubscribe({ arrayName: 'subscriptions' })
export class ListTodosComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  private subscriptions: Subscription[] = [];
  @ViewChild(AddTodoComponent, { static: false }) child: AddTodoComponent;

  constructor(
    private store: Store<State>,
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.pipe(select(selectProject)).subscribe(project => {
        if (project) {
          this.todos = project.todos;
        }
      })
    );
  }

  ngOnDestroy() {
  }

  getAllTodos() {
    this.store.dispatch(new todoActions.SearchRequest(new TodoFilter));
  }

  getById(id: number) {
    this.store.dispatch(new todoActions.TodoGetByIdRequest(id));
    this.openAddModal();
  }

  deleteById(id: number) {
    this.store.dispatch(new todoActions.TodoDeleteById(id))
  }

  openAddModal() {
    this.child.open();
  }

}
