import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
   
    const user = this.auth.currentUser
    const esAutentificado = user ? true : false; 
    if(esAutentificado){ 
      if (user.uid == "V2vRbCk3qUWSyx1A2L00upQZJqb2") {
        return true;
      }
    
    }
    this.router.navigate(['login-page']);
    return false;
  }
}
