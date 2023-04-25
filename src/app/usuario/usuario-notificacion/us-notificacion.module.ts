import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioNotificacionPageRoutingModule } from './notify-routing.module';

import { UsuarioNotificacionPage } from './us-notificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioNotificacionPageRoutingModule
  ],
  declarations: [UsuarioNotificacionPage]
})
export class UsuarioNotificacionPageModule {}
