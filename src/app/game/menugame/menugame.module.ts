import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenugamePageRoutingModule } from './menugame-routing.module';

import { MenugamePage } from './menugame.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenugamePageRoutingModule
  ],
  declarations: [MenugamePage]
})
export class MenugamePageModule {}
