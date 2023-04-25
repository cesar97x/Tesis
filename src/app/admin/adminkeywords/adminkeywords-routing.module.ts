import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminkeywordsPage } from './adminkeywords.page';

const routes: Routes = [
  {
    path: '',
    component: AdminkeywordsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminkeywordsPageRoutingModule {}
