import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';

import { NewsService } from '../news/news.service';
import { ProductsService } from '../products/products.service';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [HomeComponent, HeaderComponent],
    imports: [AppRoutingModule],
    exports: [HeaderComponent, AppRoutingModule],
    providers: [NewsService, ProductsService],
})
export class CoreModule { }
