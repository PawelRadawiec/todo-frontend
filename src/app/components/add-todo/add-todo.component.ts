import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Todo} from '../models/todo.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../store/reducers';
import {CreateTodoRequest, SearchRequest, TodoEditRequest} from '../../store/todos/todos.actions';
import {Subscription} from 'rxjs';
import {selectGetByIdTodo} from '../../store/selectors/todo.selector';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
@AutoUnsubscribe()
export class AddTodoComponent implements OnInit, OnDestroy {
  @ViewChild('content', {static: false}) content: ElementRef;
  closeResult: string;
  request: Todo = new Todo();
  private subscriptions: Subscription[] = [];

  constructor(
    private modalService: NgbModal,
    private store: Store<State>,
  ) {
    this.subscriptions.push(
      this.store.pipe(select(selectGetByIdTodo)).subscribe(todo => {
        if (todo) {
          this.request = todo;
        }
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  saveTodo() {
    if (this.request && !this.request.id) {
      this.store.dispatch(new CreateTodoRequest(this.request));
    } else {
      this.store.dispatch(new TodoEditRequest(this.request));
    }
    this.closeModal();
  }

  closeModal() {
    this.modalService.dismissAll();
    this.store.dispatch(new SearchRequest());
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

  getButtonName() {
    return this.request && this.request.id ? 'Edit' : 'Create';
  }

}
