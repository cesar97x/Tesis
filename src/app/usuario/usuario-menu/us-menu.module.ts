import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioMenuPageRoutingModule } from './us-menu-routing.module';

import { UsuarioMenuPage } from './us-menu.page';
import { PremioComponent } from '../componentes/premio/premio.component';
import { ComponentesModule } from '../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioMenuPageRoutingModule,
    ComponentesModule,
  
    
    

  ],
  declarations: [UsuarioMenuPage]
})
export class UsuarioMenuPageModule {}
