import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MathgamePage } from './mathgame.page';

const routes: Routes = [
  {
    path: '',
    component: MathgamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MathgamePageRoutingModule {}
