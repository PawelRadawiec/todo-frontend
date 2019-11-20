import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TodoState} from '../state/app.state';

export const getTodoState = createFeatureSelector<TodoState>('todo');

export const selectTodos = createSelector(
  getTodoState,
  (state: TodoState) => state.todos
);

export const selectGetByIdTodo = createSelector(
  getTodoState,
  (state: TodoState) => state.todoById
)
