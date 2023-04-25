import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportePredictivoPage } from './reporte-predictivo.page';

const routes: Routes = [
  {
    path: '',
    component: ReportePredictivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportePredictivoPageRoutingModule {}
