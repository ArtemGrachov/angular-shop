import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';
import { DashModule } from './dash/dash.module';
import { HomeModule } from './home/home.module';
import { AlertsModule } from './alerts/alerts.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyAqS2b3hha6JNu2MNqrxUpWcS_MGjmihxI',
  authDomain: 'angular-shop-e7657.firebaseapp.com',
  databaseURL: 'https://angular-shop-e7657.firebaseio.com',
  projectId: 'angular-shop-e7657',
  storageBucket: '',
  messagingSenderId: '903856699244'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AdminModule,
    NewsModule,
    ProductsModule,
    ProvidersModule,
    AuthModule,
    DashModule,
    HomeModule,
    AlertsModule,
    SharedModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
