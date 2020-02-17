import { Todo } from './todo.model';

export class Project {
    id: number;
    title: string;
    description: string;
    todos: Todo[] = [];

    constructor(props = {}) {
        Object.assign(this, props);
    }
}