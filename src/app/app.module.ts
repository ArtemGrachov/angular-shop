import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';
import { DashModule } from './dash/dash.module';
import { HomeModule } from './home/home.module';
import { ModalModule } from './modal/modal.module';
import { SupportModule } from './support/support.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { InitLoad } from './app.initload';

import { AppComponent } from './app.component';

import { alertsStoreProviders } from './data/stores/alerts.store';

import { ConfirmationComponent } from './modal/confirmation/confirmation.component';
import { AlertComponent } from './modal/alert/alert.component';
import { SupportWindowComponent } from './support/support-window/support-window.component';

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
    ModalModule,
    SupportModule,
    SharedModule,
    HttpModule
  ],
  providers: [
    alertsStoreProviders,
    InitLoad,
    {
      provide: APP_INITIALIZER,
      useFactory: function (initLoad: InitLoad) { return function () { initLoad.loadUser(); }; },
      deps: [InitLoad],
      multi: true
    }
  ],
  entryComponents: [
    ConfirmationComponent,
    AlertComponent,
    SupportWindowComponent
  ],
  exports: [SharedModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
