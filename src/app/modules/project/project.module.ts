import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectListComponent } from './components/project-list/project-list.component';


@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AddProjectComponent, ProjectListComponent],
  exports: [AddProjectComponent, ProjectListComponent]
})
export class ProjectModule { }
