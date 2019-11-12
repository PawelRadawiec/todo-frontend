import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/shared/service/todo/todo.service';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import * as todoActions from '../../store/actions/todos.actions';
import { Observable } from 'rxjs';
import { State } from '../../store/reducers';
import { selectTodos } from 'src/app/store/selectors/todo.selector';


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
export class ListTodosComponent implements OnInit {

  todosSate$: Observable<Todo[]>;
  todos: Todo[] = [];

  constructor(
    private store: Store<State>,
  ) {
    this.todosSate$ = this.store.pipe(select(selectTodos));
    console.log('todosSate$', this.todosSate$);
  }

  ngOnInit() {
  }

  getAllTodos() {
    this.store.dispatch(new todoActions.SearchRequest());
  }

}
