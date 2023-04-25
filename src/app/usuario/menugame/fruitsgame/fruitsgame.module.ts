import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FruitsgamePageRoutingModule } from './fruitsgame-routing.module';

import { FruitsgamePage } from './fruitsgame.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FruitsgamePageRoutingModule
  ],
  declarations: [FruitsgamePage]
})
export class FruitsgamePageModule {}
