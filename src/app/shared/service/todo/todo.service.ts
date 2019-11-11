import { Injectable } from '@angular/core';
import { Todo } from 'src/app/components/list-todos/list-todos.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTodos() {
    return this.http.get<Todo[]>('http://localhost:8080/todo/todos');
  }
}
