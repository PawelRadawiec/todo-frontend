import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { ListTodosComponent } from './components/list-todos/list-todos.component';
import { AddSubtaskComponent } from './components/add-subtask/add-subtask.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DragDropModule
    ],
    declarations: [
        AddTodoComponent,
        ListTodosComponent,
        AddSubtaskComponent
    ],
    exports: [
        AddTodoComponent,
        ListTodosComponent,
        AddSubtaskComponent
    ]
})
export class TodoModule { }
