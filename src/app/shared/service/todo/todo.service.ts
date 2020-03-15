import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { TodoFilter, Todo } from '../../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = 'http://localhost:8080/todo';

  constructor(
    private http: HttpClient
  ) {
  }

  getAllTodos(filter: TodoFilter) {
    return this.http.get<Todo[]>(`${this.baseUrl}/todos`, {params: this.createHttpParams(filter)});
  }

  getById(id: number) {
    return this.http.get<Todo>(`${this.baseUrl}/${id}`);
  }

  saveTodo(request: Todo) {
    return this.http.post<Todo>(`${this.baseUrl}/create`, request);
  }

  editTodo(request: Todo) {
    return this.http.put<Todo>(`${this.baseUrl}/update`, request);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getByProjectId(id: number) {
    return this.http.get<Todo[]>(`${this.baseUrl}/project/todo/${id}`);
  }

  private createHttpParams(filter: TodoFilter) {
    let params = new HttpParams();
    if (filter.description) {
      params = params.append('description', filter.description);
    }
    return params;
  }


}
