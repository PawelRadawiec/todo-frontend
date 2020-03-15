export class Subtask {
    id: number;
    content: string;

    constructor(props = {}) {
      Object.assign(this, props);
    }
  }