import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { SearchRequest } from 'src/app/store/todos/todos.actions';
import { TodoFilter } from '../models/todo.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  description: string;
  sortBy: string;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {
  }

  private _opened: boolean = false;

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  search() {
    const filter = new TodoFilter();
    filter.description = this.description;
    filter.sortBy = this.sortBy;
    this.store.dispatch(new SearchRequest(filter));
  }

}
