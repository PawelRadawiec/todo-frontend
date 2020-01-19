import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'todo-frontend';
  private _opened: boolean = false;

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

}
