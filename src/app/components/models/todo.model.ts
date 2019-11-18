export class Todo {

  id: number;
  description: string;
  done: string;
  targetDate: Date;

  constructor(props = {}) {
    Object.assign(this, props);
  }
}
