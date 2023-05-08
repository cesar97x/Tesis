import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMenuPage } from './admin-menu.page';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  {
    path: '',
    component: AdminMenuPage,
    children:[
      {
        path: 'admin-resumen',
        loadChildren: () => import('../admin-resumen/admin-resumen.module').then( m => m.AdminResumenPageModule),
        ...canActivate(redirectUnauthorizedToLogin) 
      },
      {
        path: 'adminkeywords',
        loadChildren: () => import('../adminkeywords/adminkeywords.module').then( m => m.AdminkeywordsPageModule),
        ...canActivate(redirectUnauthorizedToLogin) 
      },
      {
        path: 'admintop10',
        loadChildren: () => import('../admintop10/admintop10.module').then( m => m.Admintop10PageModule),
        ...canActivate(redirectUnauthorizedToLogin) 
      },
      {
        path: 'admin-perfil',
        loadChildren: () => import('../admin-perfil/admin-perfil.module').then( m => m.AdminPerfilPageModule),
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'resumen-descriptivo',
        loadChildren: () => import('../resumen-descriptivo/resumen-descriptivo.module').then( m => m.ResumenDescriptivoPageModule),
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'reporte-predictivo',
        loadChildren: () => import('../reporte-predictivo/reporte-predictivo.module').then( m => m.ReportePredictivoPageModule),
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'reg-ven',
        loadChildren: () => import('../reg-ven/reg-ven.module').then( m => m.RegVenPageModule),
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'set-premios',
        loadChildren: () => import('../set-premios/set-premios.module').then( m => m.SetPremiosPageModule),
        //...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'pedidos',
        loadChildren: () => import('../pedidos/pedidos.module').then( m => m.PedidosPageModule)
      },
      {
        path: '',
        redirectTo: '/admin-menu/admin-perfil',
        pathMatch: 'full'
      },
      
    ]
  },

  {
    path: '',
    component: AdminMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminMenuPageRoutingModule {}
