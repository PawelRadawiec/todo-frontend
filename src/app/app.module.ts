import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SidebarModule } from 'ng-sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YesNoPipe } from './shared/pipes/yes-no.pipe';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/state/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { TodoEffects } from './store/todos/todo.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpInterceptorBasicAuthService } from './shared/service/http/http-interceptor-basic-auth.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { metaReducers } from './store/state/app.state';
import { RegistrationComponent } from './components/registration/registration.component'
import { SystemUserEffects } from './store/system-user/system-user.effects';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';
import { ActivationComponent } from './components/activation/activation.component';
import { ProjectEffects } from './store/project/project.effects';
import { TodoComponent } from './components/todo/todo.component';
import { TodoModule } from './modules/todo/todo.module';
import { ProjectModule } from './modules/project/project.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    YesNoPipe,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    SidebarComponent,
    RegistrationComponent,
    ConfirmRegistrationComponent,
    ActivationComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProjectModule,
    TodoModule,
    SidebarModule.forRoot(),
    EffectsModule.forRoot([
      TodoEffects,
      SystemUserEffects,
      ProjectEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorBasicAuthService, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
