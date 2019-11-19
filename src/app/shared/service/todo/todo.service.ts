import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from 'src/app/components/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAllTodos() {
    const headers = new HttpHeaders({
      Authorization: this.createBasicAuthenticationHttpHeader()
    });
    return this.http.get<Todo[]>('http://localhost:8080/todo/todos', { headers });
  }

  getById(id: number) {
    return this.http.get<Todo>(`http://localhost:8080/todo/${id}`);
  }

  saveTodo(request: Todo) {
    return this.http.post<Todo>('http://localhost:8080/todo/create', request);
  }

  editTodo(request: Todo) {
    return this.http.put<Todo>('http://localhost:8080/todo/update', request);
  }

  delete(id: number) {
    return this.http.delete<void>(`http://localhost:8080/todo/delete/${id}`);
  }

  createBasicAuthenticationHttpHeader() {
    const username = 'user';
    const password = 'password';
    return 'Basic ' + window.btoa(username + ':' + password);
  }
}
