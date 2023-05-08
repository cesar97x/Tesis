import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioMenuPage } from './us-menu.page';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [

  {
    path: '',
    component : UsuarioMenuPage,
    children: [
      {
        path: 'usuario-perfil',
        loadChildren: () => import('../usuario-perfil/us-perfil.module').then( m => m.UsuarioPerfilPageModule),
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'usuario-comentario',
        loadChildren: () => import('../usuario-comentario/us-comentario.module').then( m => m.UsuarioComentarioPageModule),
        ...canActivate(redirectUnauthorizedToLogin) 
      },
      {
        path: 'usuario-notificacion',
        loadChildren: () => import('../usuario-notificacion/us-notificacion.module').then( m => m.UsuarioNotificacionPageModule),
        ...canActivate(redirectUnauthorizedToLogin) 
      },
      
      {
        path: 'usuario-lista-comentarios',
        loadChildren: () => import('../us-lista-comentarios/list-comentarios.module').then( m => m.UsuarioListaComentariosPageModule),
        ...canActivate(redirectUnauthorizedToLogin) 
      }, 
      {
        path: 'usuario-menugames',
        loadChildren: () => import('../menugame/menu/menu.module').then( m => m.MenuPageModule),
        ...canActivate(redirectUnauthorizedToLogin) 
      }, 
      {
        path: 'usuario-list-premios',
        loadChildren: () => import('../usuario-list-premios/usuario-list-premios.module').then( m => m.UsuarioListPremiosPageModule)
      },
      {
        path: 'mispedidos',
        loadChildren: () => import('../mispedidos/mispedidos.module').then( m => m.MispedidosPageModule)
      },
    

      {
        path: '',
        redirectTo: '/usuario-menu/usuario-comentario',
        pathMatch: 'full'
      },


    ]

  },

  {
    path: '',
    component: UsuarioMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioMenuPageRoutingModule {}
