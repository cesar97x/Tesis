import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPerfilPage } from './admin-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPerfilPageRoutingModule {}
