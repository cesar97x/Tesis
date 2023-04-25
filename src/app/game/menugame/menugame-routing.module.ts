import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenugamePage } from './menugame.page';

const routes: Routes = [
  {
    path: '',
    component: MenugamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenugamePageRoutingModule {}
