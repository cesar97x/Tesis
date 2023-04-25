import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AhorcadogamePage } from './ahorcadogame.page';

const routes: Routes = [
  {
    path: '',
    component: AhorcadogamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AhorcadogamePageRoutingModule {}
