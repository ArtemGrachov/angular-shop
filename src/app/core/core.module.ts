import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [HomeComponent, HeaderComponent],
    imports: [AppRoutingModule],
    exports: [HeaderComponent, AppRoutingModule],
    providers: [],
})
export class CoreModule { }
