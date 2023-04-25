import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPerfilPageRoutingModule } from './admin-perfil-routing.module';

import { AdminPerfilPage } from './admin-perfil.page';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPerfilPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [AdminPerfilPage]
})
export class AdminPerfilPageModule {}
