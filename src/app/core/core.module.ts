import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { AppRoutingModule } from '../app-routing.module';

import { NewsService } from '../news/news.service';
import { ProductsService } from '../products/products.service';
import { ProvidersService } from '../providers/providers.service';
import { CommentsService } from '../news/comments.service';
import { UsersService } from '../admin/users.service';
import { OrdersService } from '../admin/orders.service';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../shared/data.service';

import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [HeaderComponent],
    imports: [SharedModule, AppRoutingModule],
    exports: [HeaderComponent, AppRoutingModule],
    providers: [
        NewsService,
        ProductsService,
        ProvidersService,
        CommentsService,
        UsersService,
        OrdersService,
        AuthService,
        DataService
    ],
})
export class CoreModule { }
