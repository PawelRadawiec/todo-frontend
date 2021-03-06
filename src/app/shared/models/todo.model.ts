import { Subtask } from './subtask.model';
import { Project } from './project.model';

export class Todo {
  id: number;
  description: string;
  done: string;
  title: string;
  status: string;
  targetDate: Date;
  author: string;
  subtasks: Subtask[] = [];
  project: Project;
  listConnectedTo: string[] = [];
  tagName: string;

  constructor(props = {}) {
    Object.assign(this, props);
  }
}

export class TodoFilter {
  sortBy: string;
  direction: string;
  description: string;
}

