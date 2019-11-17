import {Component, OnInit, Injectable, ViewChild, ElementRef} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TodoService} from '../../shared/service/todo/todo.service';
import {Todo} from '../models/todo.model';
import {Store} from '@ngrx/store';
import {State} from '../../store/reducers';
import {CreateTodoRequest} from '../../store/todos/todos.actions';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  closeResult: string;
  request: Todo = new Todo();
  @ViewChild('content', {static: false}) content: ElementRef;

  constructor(
    private modalService: NgbModal,
    private store: Store<State>,
  ) {
  }

  ngOnInit() {
  }

  saveTodo() {
    this.store.dispatch(new CreateTodoRequest(this.request));
  }

  closeModal() {
    // this.modalService.close();
  }

  open() {
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
