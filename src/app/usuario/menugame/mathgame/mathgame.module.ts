import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MathgamePageRoutingModule } from './mathgame-routing.module';

import { MathgamePage } from './mathgame.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MathgamePageRoutingModule
  ],
  declarations: [MathgamePage]
})
export class MathgamePageModule {}
