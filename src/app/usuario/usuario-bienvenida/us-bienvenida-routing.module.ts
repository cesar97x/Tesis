import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioBienvenidaPage } from './us-bienvenida.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioBienvenidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioBienvenidaPageRoutingModule {}
