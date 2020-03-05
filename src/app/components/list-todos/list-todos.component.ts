import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from '../../store/state/app.state';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Todo, TodoFilter, TodoStatus } from '../models/todo.model';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { selectProjectTodos } from 'src/app/store/selectors/todo.selector';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { cloneDeep } from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../models/project.model';
import * as todoActions from '../../store/todos/todos.actions';


@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
@AutoUnsubscribe({ arrayName: 'subscriptions' })
export class ListTodosComponent implements OnInit, OnDestroy {
  @ViewChild(AddTodoComponent) child: AddTodoComponent;
  private subscriptions: Subscription[] = [];
  private projectId;
  todos: Todo[] = [];
  ToDoList: Todo[] = [];
  InProgressList: Todo[] = [];
  DoneList: Todo[] = [];

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.pipe(select(selectProjectTodos)).subscribe(todos => {
        this.todos = cloneDeep(todos);
        this.sortTodoList();
      })
    );
    this.projectId = this.route.snapshot.paramMap.get('projectId');
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
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.handleStatusChange(event);
  }

  handleStatusChange(event: CdkDragDrop<string[]>) {
    const currentBlockId = event.container.id;
    const currentIndex = event.currentIndex;
    if (event.container.id === event.previousContainer.id) {
      return;
    }
    switch (currentBlockId) {
      case 'cdk-drop-list-0': {
        this.updateTodo(this.ToDoList[currentIndex], TodoStatus.TO_DO);
        break;
      }
      case 'cdk-drop-list-1': {
        this.updateTodo(this.InProgressList[currentIndex], TodoStatus.IN_PROGRESS);
        break;
      }
      case 'cdk-drop-list-2': {
        this.updateTodo(this.DoneList[currentIndex], TodoStatus.DONE)
        break;
      }
    }
  }

  updateTodo(changedTodo: Todo, status: TodoStatus) {
    let todo = new Todo(changedTodo);
    todo.project = new Project();
    todo.status = status;
    todo.project.id = this.projectId;
    this.store.dispatch(new todoActions.TodoEditRequest(todo));
  }

  sortTodoList() {
    this.todos.forEach(todo => {
      switch (todo.status) {
        case TodoStatus.TO_DO:
          this.ToDoList.push(todo);
          break;
        case TodoStatus.IN_PROGRESS:
          this.InProgressList.push(todo);
          break;
        case TodoStatus.DONE:
          this.DoneList.push(todo);
          break;
      }
    })
  }


}
