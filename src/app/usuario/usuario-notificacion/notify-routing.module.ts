import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioNotificacionPage } from './us-notificacion.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioNotificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioNotificacionPageRoutingModule {}
