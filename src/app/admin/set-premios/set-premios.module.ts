import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetPremiosPageRoutingModule } from './set-premios-routing.module';

import { SetPremiosPage } from './set-premios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetPremiosPageRoutingModule,
    
  ],
  declarations: [SetPremiosPage]
})
export class SetPremiosPageModule {}
