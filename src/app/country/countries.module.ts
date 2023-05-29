import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectorPageComponent } from './pages/selector-page/selector-page.component';
import { CountryRoutingModule } from './countries.routing.module';
import { OrderByPipe } from './pipes/order-by.pipe';


@NgModule({
  declarations: [
    SelectorPageComponent,
    OrderByPipe
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CountriesModule { }
