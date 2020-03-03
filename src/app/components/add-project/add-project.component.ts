import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store/state/app.state';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ErrorComponent } from '../error/error.component';
import { FormInit } from '../models/form.interface';
import { ProjectCreateRequest } from 'src/app/store/project/project.actions';
import { Project } from '../models/project.model';
import { Subscription } from 'rxjs';
import { selectProject } from 'src/app/store/selectors/project.selector';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent extends ErrorComponent implements OnInit, FormInit {
  @ViewChild('content') content: ElementRef;
  protected subscriptions: Subscription[] = [];
  projectForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    protected store: Store<State>,
    private formBuilder: FormBuilder
  ) {
    super(store);
    this.subscriptions.push(
      this.store.pipe(select(selectProject)).subscribe(project => {
        if(project) {
          this.closeModal();
        }
      })
    )
  }

  ngOnInit() {
    this.initForm();
    this.form = this.projectForm;
  }

  onSubmit() {
    this.store.dispatch(new ProjectCreateRequest(new Project(this.projectForm.value)));
  }

  open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  initForm() {
    this.projectForm = this.formBuilder.group({
      title: [],
      description: [],
    });
  }


}
