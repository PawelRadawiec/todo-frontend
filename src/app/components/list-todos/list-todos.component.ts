import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from '../../store/state/app.state';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { selectProjectTodos } from 'src/app/store/selectors/todo.selector';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import * as todoActions from '../../store/todos/todos.actions';
import { AddSubtaskComponent } from '../add-subtask/add-subtask.component';
import { Todo, TodoFilter } from 'src/app/shared/models/todo.model';
import { Project } from 'src/app/shared/models/project.model';


@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
@AutoUnsubscribe({ arrayName: 'subscriptions' })
export class ListTodosComponent implements OnInit, OnDestroy {
  @ViewChild(AddTodoComponent) child: AddTodoComponent;
  @ViewChild(AddSubtaskComponent) subtaskChild: AddSubtaskComponent;
  private subscriptions: Subscription[] = [];
  private projectId;
  todos: Todo[] = [];
  connectedTo = [];

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.pipe(select(selectProjectTodos)).subscribe(todos => {
        this.todos = _.cloneDeep(todos);
        for (const todo of this.todos) {
          this.connectedTo.push(todo.status);
        }
      })
    );
    this.projectId = this.route.snapshot.paramMap.get('projectId');
  }

  ngOnDestroy() {
  }

  openSubtaskModal(todo: Todo) {
    this.store.dispatch(new todoActions.TodoGetByIdRequest(todo.id));
    this.subtaskChild.open();
  }

  getAllTodos() {
    this.store.dispatch(new todoActions.SearchRequest(new TodoFilter()));
  }

  getById(id: number) {
    this.store.dispatch(new todoActions.TodoGetByIdRequest(id));
    this.openAddModal();
  }

  deleteById(id: number) {
    this.store.dispatch(new todoActions.TodoDeleteById(id));
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
    const changedTodo = this.todos.find(todo => todo.status === event.container.id);
    this.updateSubtask(changedTodo);
  }

  updateSubtask(changedTodo: Todo) {
    const todo = _.cloneDeep(changedTodo);
    todo.project = new Project();
    todo.project.id = this.projectId;
    this.store.dispatch(new todoActions.TodoEditRequest(todo));
  }


}
