import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutRoutingModule } from './checkout-routing.module';

@NgModule({
  declarations: [],
  imports: [
  CommonModule,
    CheckoutRoutingModule
  ],
})
export class CheckoutModule { }
