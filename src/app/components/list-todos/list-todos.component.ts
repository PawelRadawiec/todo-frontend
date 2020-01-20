import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as todoActions from '../../store/todos/todos.actions';
import {Subscription} from 'rxjs';
import {State} from '../../store/reducers';
import {selectTodos} from 'src/app/store/selectors/todo.selector';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {Todo, TodoFilter} from '../models/todo.model';
import {AddTodoComponent} from '../add-todo/add-todo.component';
import {SearchRequest} from '../../store/todos/todos.actions';


@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
@AutoUnsubscribe()
export class ListTodosComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  private subscriptions: Subscription[] = [];
  @ViewChild(AddTodoComponent, {static: false}) child: AddTodoComponent;

  constructor(
    private store: Store<State>,
  ) {
    this.subscriptions.push(
      this.store.pipe(select(selectTodos)).subscribe(todos => {
        this.todos = todos;
      })
    );

  }

  ngOnInit() {
    this.store.dispatch(new SearchRequest(new TodoFilter));
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
