import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioListaComentariosPage } from './list-comentarios.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioListaComentariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioListaComentariosPageRoutingModule {}
