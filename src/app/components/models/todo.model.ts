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
