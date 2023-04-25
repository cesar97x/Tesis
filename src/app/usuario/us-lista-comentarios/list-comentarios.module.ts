import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioListaComentariosPageRoutingModule } from './com-routing.module';

import { UsuarioListaComentariosPage } from './list-comentarios.page';
import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioListaComentariosPageRoutingModule,
    NgxStarRatingModule
  ],
  declarations: [UsuarioListaComentariosPage]
})
export class UsuarioListaComentariosPageModule {}
