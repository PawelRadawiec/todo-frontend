import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FormGroup, FormBuilder } from '@angular/forms';
import { selectProjectId } from 'src/app/store/selectors/project.selector';
import { Project } from 'src/app/shared/models/project.model';
import { Todo, TodoFilter } from 'src/app/shared/models/todo.model';
import * as todoActions from '../../../../store/todos/todos.actions';
import { State } from 'src/app/store/state/app.state';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { selectGetByIdTodo, selectCreateResponse } from 'src/app/store/selectors/todo.selector';
import { CreateTodoRequest, SearchRequest } from 'src/app/store/todos/todos.actions';

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
    const project = new Project();
    project.id = this.projectId;
    const todo = new Todo(this.todoForm.value);
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
