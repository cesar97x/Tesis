import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AhorcadogamePageRoutingModule } from './ahorcadogame-routing.module';

import { AhorcadogamePage } from './ahorcadogame.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AhorcadogamePageRoutingModule
  ],
  declarations: [AhorcadogamePage]
})
export class AhorcadogamePageModule {}
