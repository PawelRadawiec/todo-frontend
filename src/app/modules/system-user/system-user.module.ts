import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';
import { ActivationComponent } from './components/activation/activation.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    declarations: [
        RegistrationComponent,
        LoginComponent,
        LogoutComponent,
        ConfirmRegistrationComponent,
        ActivationComponent,
        WelcomeComponent
    ],
    exports: [
        RegistrationComponent,
        LoginComponent,
        LogoutComponent,
        ConfirmRegistrationComponent,
        ActivationComponent,
        WelcomeComponent
    ]
})
export class SystemUserModule { }
