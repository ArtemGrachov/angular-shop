import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { AppRoutingModule } from '../app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { NewsService } from '../news/news.service';
import { ProductsService } from '../products/products.service';
import { ProvidersService } from '../providers/providers.service';
import { CommentsService } from '../news/comments.service';
import { UsersService } from '../admin/users.service';
import { OrdersService } from '../admin/orders.service';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../shared/data.service';
import { AlertsService } from '../alerts/alerts.service';

import { HeaderComponent } from './header/header.component';

export const firebaseConfig = {
    apiKey: 'AIzaSyAqS2b3hha6JNu2MNqrxUpWcS_MGjmihxI',
    authDomain: 'angular-shop-e7657.firebaseapp.com',
    databaseURL: 'https://angular-shop-e7657.firebaseio.com',
    projectId: 'angular-shop-e7657',
    storageBucket: '',
    messagingSenderId: '903856699244'
};

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        SharedModule,
        AppRoutingModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    exports: [
        HeaderComponent,
        AppRoutingModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireModule
    ],
    providers: [
        NewsService,
        ProductsService,
        ProvidersService,
        CommentsService,
        UsersService,
        OrdersService,
        AuthService,
        DataService,
        AlertsService
    ],
})
export class CoreModule { }
