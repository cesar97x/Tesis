import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioPerfilPage } from './us-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioPerfilPageRoutingModule {}
