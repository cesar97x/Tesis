import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportePredictivoPageRoutingModule } from './reporte-predictivo-routing.module';

import { ReportePredictivoPage } from './reporte-predictivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportePredictivoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ReportePredictivoPage]
})
export class ReportePredictivoPageModule {}
