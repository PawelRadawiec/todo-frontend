import { Component, OnInit } from '@angular/core';

export class Todo {
  constructor(
    public id: number, 
    public description: string,
    public done: boolean, 
    public targetDate: Date
    ) {

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[] = [
      new Todo(1, 'test1', true, new Date()),
      new Todo(2, 'test2', false, new Date()),
      new Todo(3, 'test3', true, new Date()),
  ]

  constructor() { }

  ngOnInit() {
  }

}
