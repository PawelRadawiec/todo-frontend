import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../models/todo.model';
import { select, Store } from '@ngrx/store';
import { State } from '../../store/reducers';
import { CreateTodoRequest, SearchRequest, TodoEditRequest } from '../../store/todos/todos.actions';
import { Subscription } from 'rxjs';
import { selectGetByIdTodo } from '../../store/selectors/todo.selector';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
@AutoUnsubscribe()
export class AddTodoComponent implements OnInit, OnDestroy {
  @ViewChild('content', { static: false }) content: ElementRef;
  todo: Todo;
  private subscriptions: Subscription[] = [];

  constructor(
    private modalService: NgbModal,
    private store: Store<State>,
  ) {
    this.subscriptions.push(
      this.store.pipe(select(selectGetByIdTodo)).subscribe(todo => {
        if (todo) {
          this.todo = cloneDeep(todo);
        } else {
          this.todo = new Todo();
        }
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  saveTodo() {
    if (this.todo && !this.todo.id) {
      this.store.dispatch(new CreateTodoRequest(this.todo));
    } else {
      this.store.dispatch(new TodoEditRequest(this.todo));
    }
    this.closeModal();
  }

  closeModal() {
    this.modalService.dismissAll();
    this.store.dispatch(new SearchRequest());
    this.todo = new Todo();
  }

  open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getButtonName() {
    return this.todo && this.todo.id ? 'Edit' : 'Create';
  }

}
