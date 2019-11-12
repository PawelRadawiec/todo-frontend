import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/shared/service/todo/todo.service';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import * as todoActions from '../../store/actions/todos.actions';
import { Observable, Subscription } from 'rxjs';
import { State } from '../../store/reducers';
import { selectTodos } from 'src/app/store/selectors/todo.selector';
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";


export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
@AutoUnsubscribe()
export class ListTodosComponent implements OnInit {
  todos: Todo[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<State>,
  ) {
    this.subscriptions.push(
      this.store.pipe(select(selectTodos)).subscribe(todos => {
        this.todos = todos;
      })
    );

  }

  ngOnInit() { }
  ngOnDestroy() { }

  getAllTodos() {
    this.store.dispatch(new todoActions.SearchRequest());
  }

}
