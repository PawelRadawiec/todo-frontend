import { Subtask } from './subtask.model';
import { Project } from './project.model';

export class Todo {
  id: number;
  description: string;
  done: string;
  title: string;
  status: TodoStatus;
  targetDate: Date;
  author: string;
  subtasks: Subtask[] = [];
  project: Project;

  constructor(props = {}) {
    Object.assign(this, props);
  }
}

export class TodoFilter {
  sortBy: string;
  direction: string;
  description: string;
}

export enum TodoStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}
