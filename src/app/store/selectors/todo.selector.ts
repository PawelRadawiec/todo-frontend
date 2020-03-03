import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TodoState} from '../state/app.state';

export const getTodoState = createFeatureSelector<TodoState>('todoState');

export const selectTodos = createSelector(
  getTodoState,
  (state: TodoState) => state.todos
);

export const selectGetByIdTodo = createSelector(
  getTodoState,
  (state: TodoState) => state.todoById
);

export const selectCreateResponse = createSelector(
  getTodoState,
  (state: TodoState) => state.createResponse
);

export const selectProjectTodos = createSelector(
  getTodoState,
  (state: TodoState) => state.projectTodoList
);
