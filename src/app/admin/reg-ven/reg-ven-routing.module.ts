import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegVenPage } from './reg-ven.page';

const routes: Routes = [
  {
    path: '',
    component: RegVenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegVenPageRoutingModule {}
