import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as todoActions from '../../store/todos/todos.actions';
import { Subscription } from 'rxjs';
import { State } from '../../store/state/app.state';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Todo, TodoFilter } from '../models/todo.model';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { selectProjectTodos } from 'src/app/store/selectors/todo.selector';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
@AutoUnsubscribe({ arrayName: 'subscriptions' })
export class ListTodosComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  ToDoList = [
    'task 1',
    'task 2',
    'task 3',
    'task4 '
  ];
  InProgressList = [

  ];

  DoneList = [
  ];
  private subscriptions: Subscription[] = [];
  @ViewChild(AddTodoComponent) child: AddTodoComponent;

  constructor(
    private store: Store<State>,
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.pipe(select(selectProjectTodos)).subscribe(todos => {
        this.todos = todos;
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

  onDrop(event: CdkDragDrop<string[]>) {
    console.log('event: ', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
