import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ErrorComponent } from './components/error/error.component';
import { ListTodosComponent } from './components/list-todos/list-todos.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RouteGuardService } from './shared/service/route-guard.service';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ActivationComponent } from './components/activation/activation.component';
import { ActivationResolver } from './shared/resolvers/activation.resolver';
import { ProjectListResolver } from './shared/resolvers/project-list.resolver';
import { TodosResolver } from './shared/resolvers/todos.resolver';
import { ProjectListComponent } from './project/project/components/project-list/project-list.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'welcome/:name',
    component: WelcomeComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'add-todo',
    component: AddTodoComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'activation/:activationCode',
    component: ActivationComponent,
    resolve: {
      activationResolver: ActivationResolver
    }
  },
  {
    path: 'project/list',
    component: ProjectListComponent,
    canActivate: [RouteGuardService],
    resolve: {
      activationResolver: ProjectListResolver
    }
  },
  {
    path: 'project/:projectId/todos',
    component: ListTodosComponent,
    canActivate: [RouteGuardService],
    resolve: {
      activationResolver: TodosResolver
    }
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    ActivationResolver,
    ProjectListResolver,
    TodosResolver
  ]
})
export class AppRoutingModule { }
