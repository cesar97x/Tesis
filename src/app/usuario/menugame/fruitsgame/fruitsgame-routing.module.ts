import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FruitsgamePage } from './fruitsgame.page';

const routes: Routes = [
  {
    path: '',
    component: FruitsgamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FruitsgamePageRoutingModule {}
