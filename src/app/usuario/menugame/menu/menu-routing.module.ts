import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage
  },

  {
    path: 'ahorcadogame',
    loadChildren: () => import('../ahorcadogame/ahorcadogame.module').then( m => m.AhorcadogamePageModule),
    //...canActivate(redirectUnauthorizedToLogin) 
  },
  {
    path: 'fruitsgame',
    loadChildren: () => import('../fruitsgame/fruitsgame.module').then( m => m.FruitsgamePageModule),
    //...canActivate(redirectUnauthorizedToLogin) 
  },
  {
    path: 'mathgame',
    loadChildren: () => import('../mathgame/mathgame.module').then( m => m.MathgamePageModule),
    //...canActivate(redirectUnauthorizedToLogin) 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
