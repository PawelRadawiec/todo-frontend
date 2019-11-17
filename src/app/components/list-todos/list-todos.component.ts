import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as todoActions from '../../store/todos/todos.actions';
import {Subscription} from 'rxjs';
import {State} from '../../store/reducers';
import {selectTodos} from 'src/app/store/selectors/todo.selector';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {Todo} from '../models/todo.model';
import {AddTodoComponent} from '../add-todo/add-todo.component';


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
  }

  ngOnDestroy() {
  }

  getAllTodos() {
    this.store.dispatch(new todoActions.SearchRequest());
  }

  getById(id: number) {
    this.store.dispatch(new todoActions.TodoGetByIdRequest(id));
    this.openAddModal();
  }

  openAddModal() {
    this.store.dispatch(new todoActions.TodoGetByIdResponse(new Todo()));
    this.child.open();
  }

}
