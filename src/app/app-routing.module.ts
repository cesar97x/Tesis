import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
  hasCustomClaim,
}from '@angular/fire/auth-guard' 


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToUsuarioInfo = () => redirectLoggedInTo(['usuario-menu']);
//const redirectLoggedInToAmdinUsuario = () => redirectLoggedInTo(['admin-menu']);
const adminOnly = () => hasCustomClaim('admin');

const redirectRegistroToUserInfo = () => redirectLoggedInTo(['usuario-add-info']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-page',
    pathMatch: 'full'
  },
  {
    path: 'sing-up',
    loadChildren: () => import('./sing-up/sing-up.module').then( m => m.SingUpPageModule),...canActivate(redirectRegistroToUserInfo)
  },

  {
    path: 'login-page',
    loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule),
    ...canActivate(redirectLoggedInToUsuarioInfo)
  },
  {
    path: 'usuario-bienvenida',
    loadChildren: () => import('./usuario/usuario-bienvenida/us-bienvenida.module').then( m => m.UsuarioBienvenidaPageModule)
  },

  {
    path: 'usuario-add-info',
    loadChildren: () => import('./usuario/usuario-add-info/us-add-info.module').then( m => m.UsuarioAddInfoPageModule),
    ...canActivate(redirectUnauthorizedToLogin) 
  },

  {
    path: 'usuario-menu',
    loadChildren: () => import('./usuario/usuario-menu/us-menu.module').then( m => m.UsuarioMenuPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },

  {
    path: 'admin-menu',
    loadChildren: () => import('./admin/admin-menu/admin-menu.module').then( m => m.AdminMenuPageModule),// canActivate:[AuthGuard]
  },
  {
    path: 'resumen-descriptivo',
    loadChildren: () => import('./admin/resumen-descriptivo/resumen-descriptivo.module').then( m => m.ResumenDescriptivoPageModule)
  },
  {
    path: 'reporte-predictivo',
    loadChildren: () => import('./admin/reporte-predictivo/reporte-predictivo.module').then( m => m.ReportePredictivoPageModule)
  },
  {
    path: 'reg-ven',
    loadChildren: () => import('./admin/reg-ven/reg-ven.module').then( m => m.RegVenPageModule)
  },  {
    path: 'set-premios',
    loadChildren: () => import('./admin/set-premios/set-premios.module').then( m => m.SetPremiosPageModule)
  },
  {
    path: 'usuario-list-premios',
    loadChildren: () => import('./usuario/usuario-list-premios/usuario-list-premios.module').then( m => m.UsuarioListPremiosPageModule)
  },
  {
    path: 'mispedidos',
    loadChildren: () => import('./usuario/mispedidos/mispedidos.module').then( m => m.MispedidosPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./admin/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },

  
  
  

  



  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
