import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'ng-sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SidebarModule,
        BrowserAnimationsModule
    ],
    declarations: [
        FooterComponent,
        MenuComponent,
        SidebarComponent
    ],
    exports: [
        FooterComponent,
        MenuComponent,
        SidebarComponent
    ]
})
export class CommonModule { }
