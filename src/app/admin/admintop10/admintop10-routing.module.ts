import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Admintop10Page } from './admintop10.page';

const routes: Routes = [
  {
    path: '',
    component: Admintop10Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Admintop10PageRoutingModule {}
