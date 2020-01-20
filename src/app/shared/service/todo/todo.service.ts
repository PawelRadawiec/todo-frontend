import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Todo, TodoFilter } from 'src/app/components/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) {
  }

  getAllTodos(filter: TodoFilter) {
    const params = new HttpParams()
    if(filter) {
      params.set('sortBy', filter.sortBy);
    }
    return this.http.get<Todo[]>(`${this.baseUrl}/todo/todos`, {params});
  }

  getById(id: number) {
    return this.http.get<Todo>(`${this.baseUrl}/todo/${id}`);
  }

  saveTodo(request: Todo) {
    return this.http.post<Todo>(`${this.baseUrl}/todo/create`, request);
  }

  editTodo(request: Todo) {
    return this.http.put<Todo>(`${this.baseUrl}/todo/update`, request);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/todo/delete/${id}`);
  }

}
