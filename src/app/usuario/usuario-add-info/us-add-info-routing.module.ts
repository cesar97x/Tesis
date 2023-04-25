import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioAddInfoPage } from './us-add-info.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioAddInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioAddInfoPageRoutingModule {}
