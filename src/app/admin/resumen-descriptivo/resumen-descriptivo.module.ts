import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenDescriptivoPageRoutingModule } from './resumen-descriptivo-routing.module';

import { ResumenDescriptivoPage } from './resumen-descriptivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumenDescriptivoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ResumenDescriptivoPage]
})
export class ResumenDescriptivoPageModule {}
