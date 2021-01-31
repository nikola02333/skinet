import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    ShopModule
  ],
  providers: [  HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
