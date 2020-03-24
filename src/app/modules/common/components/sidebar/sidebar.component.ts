import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {SearchRequest} from 'src/app/store/todos/todos.actions';
import {TodoFilter} from 'src/app/shared/models/todo.model';
import {AddTodoComponent} from 'src/app/modules/todo/components/add-todo/add-todo.component';
import {AddProjectComponent} from 'src/app/modules/project/components/add-project/add-project.component';
import {State} from 'src/app/store/state/app.state';
import {Subscription} from 'rxjs';
import {selectIsAuthenticated} from '../../../../store/selectors/authorization.selector';
import {selectProjectTodos} from '../../../../store/selectors/todo.selector';
import {selectProjects} from '../../../../store/selectors/project.selector';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
@AutoUnsubscribe({arrayName: 'subscriptions'})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild(AddTodoComponent) childTodo: AddTodoComponent;
  @ViewChild(AddProjectComponent) childProject: AddProjectComponent;
  subscriptions: Subscription[] = [];
  projectId: string;
  description: string;
  sortBy: string;
  _opened = false;
  addTodoVisible = false;
  addProjectVisible = false;
  authenticated: boolean;
  searchLabel: string;

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.subscribeAuthenticated(),
      this.subscribeTodoList(),
      this.subscribeProjects()
    );
  }

  ngOnDestroy() {
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  search() {
    const filter = new TodoFilter();
    filter.description = this.description;
    filter.sortBy = this.sortBy;
    this.store.dispatch(new SearchRequest(filter));
  }

  openTodoModal() {
    this.childTodo.open();
  }

  openProjectModal() {
    this.childProject.open();
  }

  private subscribeAuthenticated() {
    return this.store.select(selectIsAuthenticated)
      .subscribe(authenticated => {
        this.authenticated = authenticated;
      });
  }

  private subscribeTodoList() {
    return this.store.select(selectProjectTodos)
      .subscribe(todoList => {
        this.addTodoVisible = (todoList && todoList.length > 0);
        if (this.addTodoVisible) {
          this.searchLabel = 'todos';
        }
      });
  }

  private subscribeProjects() {
    return this.store.select(selectProjects)
      .subscribe(projects => {
        this.addProjectVisible = (projects && projects.length > 0);
        if (this.addProjectVisible) {
          this.searchLabel = 'projects';
        }
      });
  }


}
