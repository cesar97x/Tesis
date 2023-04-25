import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioComentarioPageRoutingModule } from './us-comentario-routing.module';

import { UsuarioComentarioPage } from './us-comentario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioComentarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UsuarioComentarioPage]
})
export class UsuarioComentarioPageModule {}
