import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { State } from 'src/app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ErrorComponent } from '../error/error.component';
import { TodoEditRequest } from 'src/app/store/todos/todos.actions';
import * as _ from 'lodash';
import { selectGetByIdTodo, selectEditResponse } from 'src/app/store/selectors/todo.selector';
import { selectProjectId } from 'src/app/store/selectors/project.selector';
import { Project } from 'src/app/shared/models/project.model';
import { Todo } from 'src/app/shared/models/todo.model';

@Component({
  selector: 'app-add-subtask',
  templateUrl: './add-subtask.component.html',
  styleUrls: ['./add-subtask.component.css']
})
export class AddSubtaskComponent extends ErrorComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  subtaskForm: FormGroup;
  todo: Todo;
  projectId: number;

  constructor(
    private modalService: NgbModal,
    protected store: Store<State>,
    private formBuilder: FormBuilder
  ) {
    super(store);
  }

  ngOnInit() {
    this.initForm();
    super.form = this.subtaskForm;
    this.subscriptions.push(
      this.store.pipe(select(selectGetByIdTodo)).subscribe(todo => {
        this.todo = todo;
      }),
      this.store.pipe(select(selectProjectId)).subscribe(projectId => {
        this.projectId = projectId;
      }),
      this.store.pipe(select(selectEditResponse)).subscribe(response => {
        this.closeModal();
      })
    );
  }

  onSubmit() {
    const todo = _.cloneDeep(this.todo);
    todo.project = new Project({ id: this.projectId });
    todo.subtasks.push(this.subtaskForm.value);
    this.store.dispatch(new TodoEditRequest(todo));
  }

  open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  initForm() {
    this.subtaskForm = this.formBuilder.group({
      content: []
    });
  }


}
