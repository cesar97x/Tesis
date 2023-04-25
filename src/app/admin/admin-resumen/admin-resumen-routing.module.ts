import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminResumenPage } from './admin-resumen.page';

const routes: Routes = [
  {
    path: '',
    component: AdminResumenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminResumenPageRoutingModule {}
