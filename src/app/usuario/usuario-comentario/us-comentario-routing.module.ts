import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioComentarioPage } from './us-comentario.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComentarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioComentarioPageRoutingModule {}
