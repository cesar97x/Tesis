import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegVenPageRoutingModule } from './reg-ven-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegVenPage } from './reg-ven.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegVenPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegVenPage]
})
export class RegVenPageModule {}
