import {Todo} from '../../components/models/todo.model';

export interface State {
  userName?: string;
  todoState: TodoState;
}

export interface TodoState {
  todos: Todo[],
  todoById: Todo,
  editResponse: Todo
}
