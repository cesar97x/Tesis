import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminkeywordsPageRoutingModule } from './adminkeywords-routing.module';

import { AdminkeywordsPage } from './adminkeywords.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminkeywordsPageRoutingModule
  ],
  declarations: [AdminkeywordsPage]
})
export class AdminkeywordsPageModule {}
