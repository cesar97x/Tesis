import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioListPremiosPageRoutingModule } from './usuario-list-premios-routing.module';

import { UsuarioListPremiosPage } from './usuario-list-premios.page';
import { ComponentesModule } from '../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioListPremiosPageRoutingModule,
    ComponentesModule,
  ],
  declarations: [UsuarioListPremiosPage]
})
export class UsuarioListPremiosPageModule {}
