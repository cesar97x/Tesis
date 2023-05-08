import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetPremiosPage } from './set-premios.page';

const routes: Routes = [
  {
    path: '',
    component: SetPremiosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetPremiosPageRoutingModule {}
