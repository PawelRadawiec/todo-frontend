import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo, TodoFilter } from '../models/todo.model';
import { select, Store } from '@ngrx/store';
import { State } from '../../store/state/app.state';
import { SearchRequest, TodoGetByIdResponse, CreateTodoRequest, CreateTodoResponse } from '../../store/todos/todos.actions';
import { Subscription } from 'rxjs';
import { selectGetByIdTodo, selectCreateResponse } from '../../store/selectors/todo.selector';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
@AutoUnsubscribe()
export class AddTodoComponent extends ErrorComponent implements OnInit, OnDestroy {
  @ViewChild('content', { static: false }) content: ElementRef;
  protected subscriptions: Subscription[] = [];
  todoForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    protected store: Store<State>,
    private formBuilder: FormBuilder
  ) {
    super(store);
    this.subscriptions.push(
      this.store.pipe(select(selectGetByIdTodo)).subscribe(todo => { })
    );
    this.subscriptions.push(
      this.store.pipe(select(selectCreateResponse)).subscribe(createResponse => {
        if (createResponse) {
          this.closeModal();
        }
      })
    );
  }

  ngOnInit() {
    this.initTodoForm();
    this.form = this.todoForm;
  }

  ngOnDestroy() {
  }

  onSubmit() {
    this.store.dispatch(new CreateTodoRequest(new Todo(this.todoForm.value)));
  }

  closeModal() {
    this.modalService.dismissAll();
    this.store.dispatch(new SearchRequest(new TodoFilter()));
    this.store.dispatch(new TodoGetByIdResponse(new Todo()));
    this.store.dispatch(new CreateTodoResponse(null));
  }

  open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
  }

  initTodoForm() {
    this.todoForm = this.formBuilder.group({
      title: [],
      description: [],
      status: []
    });
  }
}
