import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioMenuPageRoutingModule } from './us-menu-routing.module';

import { UsuarioMenuPage } from './us-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioMenuPageRoutingModule
  ],
  declarations: [UsuarioMenuPage]
})
export class UsuarioMenuPageModule {}
