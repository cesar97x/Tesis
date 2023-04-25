import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenDescriptivoPage } from './resumen-descriptivo.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenDescriptivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenDescriptivoPageRoutingModule {}
