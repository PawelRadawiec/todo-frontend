import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/shared/service/todo/todo.service';

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

  todos: Todo[] = [];

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
  }

  getAllTodos() {
    this.todoService.getAllTodos().subscribe(response => {
      this.todos = response;
    });
  }

}
