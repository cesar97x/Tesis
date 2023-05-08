import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PremioComponent } from './premio/premio.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PremioComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ], exports: [
    PremioComponent
  ]
})
export class ComponentesModule { }
