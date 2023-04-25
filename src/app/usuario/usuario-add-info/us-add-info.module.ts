import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioAddInfoPageRoutingModule } from './us-add-info-routing.module';

import { UsuarioAddInfoPage } from './us-add-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioAddInfoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UsuarioAddInfoPage]
})
export class UsuarioAddInfoPageModule {}
