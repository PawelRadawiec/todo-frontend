import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuardService } from './shared/service/route-guard.service';
import { ActivationResolver } from './shared/resolvers/activation.resolver';
import { ProjectListResolver } from './shared/resolvers/project-list.resolver';
import { TodosResolver } from './shared/resolvers/todos.resolver';
import { AddTodoComponent } from './modules/todo/components/add-todo/add-todo.component';
import { ListTodosComponent } from './modules/todo/components/list-todos/list-todos.component';
import { ProjectListComponent } from './modules/project/components/project-list/project-list.component';
import { LoginComponent } from './modules/system-user/components/login/login.component';
import { RegistrationComponent } from './modules/system-user/components/registration/registration.component';
import { LogoutComponent } from './modules/system-user/components/logout/logout.component';
import { WelcomeComponent } from './modules/system-user/components/welcome/welcome.component';
import { ActivationComponent } from './modules/system-user/components/activation/activation.component';
import { ErrorComponent } from './modules/common/components/error/error.component';


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
