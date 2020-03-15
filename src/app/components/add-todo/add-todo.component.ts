import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo, TodoFilter } from '../models/todo.model';
import { select, Store } from '@ngrx/store';
import { State } from '../../store/state/app.state';
import { SearchRequest, CreateTodoRequest, CreateTodoResponse } from '../../store/todos/todos.actions';
import { Subscription } from 'rxjs';
import { selectGetByIdTodo, selectCreateResponse } from '../../store/selectors/todo.selector';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ErrorComponent } from '../error/error.component';
import { Project } from '../models/project.model';
import { selectProjectId } from 'src/app/store/selectors/project.selector';
import * as todoActions  from '../../store/todos/todos.actions';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
@AutoUnsubscribe()
export class AddTodoComponent extends ErrorComponent implements OnInit, OnDestroy {
  @ViewChild('content') content: ElementRef;
  protected subscriptions: Subscription[] = [];
  todoForm: FormGroup;
  projectId: number;

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
      this.store.pipe(select(selectProjectId)).subscribe(projectId => {
        this.projectId = projectId;
      }),
      this.store.pipe(select(selectCreateResponse)).subscribe(createResponse => {
        if (createResponse) {
          this.closeModal();
          this.store.dispatch(new todoActions.GetProjectTodoListRequest(this.projectId));
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
    let project = new Project();
    project.id = this.projectId;
    const todo = new Todo(this.todoForm.value)
    todo.project = project;
    this.store.dispatch(new CreateTodoRequest(todo));
  }

  closeModal() {
    this.modalService.dismissAll();
    this.store.dispatch(new SearchRequest(new TodoFilter()));
    this.todoForm.reset();
  }

  open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
  }

  initTodoForm() {
    this.todoForm = this.formBuilder.group({
      title: [],
      description: []
    });
  }
}
