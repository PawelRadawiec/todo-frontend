import { Subtask } from './subtask.model';

export class Todo {
  id: number;
  description: string;
  done: string;
  targetDate: Date;
  author: string;
  subtasks: Subtask[] = [];  

  constructor(props = {}) {
    Object.assign(this, props);
  }
}

export class TodoFilter {
  sortBy: string;
  direction: string;
  description: string;
}
