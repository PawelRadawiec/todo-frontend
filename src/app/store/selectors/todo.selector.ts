import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../todos/todo.reducer';

export const getTodoState = createFeatureSelector<State>('todo');

export const selectTodos = createSelector(
    getTodoState,
  (state: State) => state.todos
);