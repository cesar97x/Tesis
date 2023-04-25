import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminResumenPageRoutingModule } from './admin-resumen-routing.module';

import { AdminResumenPage } from './admin-resumen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminResumenPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdminResumenPage]
})
export class AdminResumenPageModule {}
