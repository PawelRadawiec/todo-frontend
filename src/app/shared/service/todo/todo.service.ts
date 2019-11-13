import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/components/models/todo.model';

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

  getById(id: number) {
    console.log('ID: ', id);
    return this.http.get<Todo>(`http://localhost:8080/todo/${id}`);
  }
}
