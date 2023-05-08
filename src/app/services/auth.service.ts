import { Injectable } from '@angular/core';
import { doc, Firestore, docData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { PerfilInterface } from '../models/UserInterface';
import { AlertController, isPlatform } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
} from '@angular/fire/auth';

import {
  getAuth,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../models/Usuario';
import { usuarioI } from '../models/game';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root',
})

export class AuthService {

 
  usuarioperfil:usuarioI={
    nombres:null,
    apellido: null,
    email:null,
    fechaNacimiento: null,
    uid:null,
    perfil:null,
    direccion : null,
    genero : null,
    edad: null
  }

  public providerG = new GoogleAuthProvider();
  uid:string;

  constructor(
    private database:FirestoreService,
    private router: Router,
    private auth: Auth, 
    private firestore: Firestore, 
    private alertController: AlertController,
    private platform: Platform,
    private googlePlus: GooglePlus,
    private afAuth: AngularFireAuth) { 
      //quitar si no funcoina recuperar el id de usuario con el q se ingresa
      //this.usuariostateAuth();
      this.getUid();
     }

  // async googleSignIn() {
  //   let googleUser = await GoogleAuth.signIn();
  //   const credential = this.auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
  //   return this.afAuth.auth.signInAndRetrieveDataWithCredential(credential);
  // }
  elPoderosoLOGINCONGOOGLE() {
    //const auth = getAuth();

    // //para abrir dentro de la pagina web
    signInWithRedirect(this.auth, this.providerG);
    //O PUEDES USAR UAN PAGINA EXTRA

    // signInWithPopup(this.auth, this.providerG)
    // .then((result) => {
    // // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // // The signed-in user info.
    // const user = result.user;
    // // ...
    // }).catch((error) => {
    // // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // // The email of the user's account used.
    // const email = error.customData.email;
    // // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    // });

    //para redireccionar a la pagina de google
    getRedirectResult(this.auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        return user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  loginGoogle() {
    if (this.platform.is('android')) {
      this.loginGoogleAndroid();
    } else {
      this.loginGoogleWeb();
    }
  }

  async loginGoogleAndroid() {
    const res = await this.googlePlus.login({
      'webClientId': "155971214151-58jinri3itmuf09mor4iq5jjiunbgcg8.apps.googleusercontent.com",
      'offline': true
    });
    const resConfirmed = await this.afAuth.signInWithCredential(firebase.default.auth.GoogleAuthProvider.credential(res.idToken));
    const user = resConfirmed.user;
    if(user.emailVerified == true){
      console.log(user);
      this.router.navigateByUrl('/usuario-menu', { replaceUrl: true });
    }
  }

  async loginGoogleWeb() {
    const res = await this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
    const user = res.user;
    if(user.emailVerified == true){
      console.log("Entra al metodo"+user.uid);
      const path='puebausu/'
      
      this.router.navigateByUrl('/usuario-menu', { replaceUrl: true });
    }
  }

  async  registrarConGoogle() {
    signInWithRedirect(this.auth, this.providerG);
    getRedirectResult(this.auth)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  
  async register(email, password) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    } 
  }

  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      if (user) {
        if(user.user.uid == 'zEPbPOgLh8OEiO2slNRwqbPcnDm1'){
          this.router.navigateByUrl('/admin-menu/admin-perfil', { replaceUrl: true });
        }else{ 
          this.router.navigateByUrl('/usuario-menu', { replaceUrl: true });
        }
        return user;
      } else {
        this.showAlert('Login fallido', 'Por favor intente de nuevo!');
        return null;
      }
    } catch (e) {
      return null;
    }
  }
  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  
  logout() {
   return this.auth.signOut();
  }

  async getUid() {
    const user = await this.auth.currentUser;
    if (user) {
      console.log("usuario obtendido --->",user)
      return user.uid;
    } else {
      return null;
    }
  }

  async getname() {
    const user = await this.auth.currentUser;
    if (user) {
      console.log("usuario obtendido --->",user)
      return user.displayName;
    } else {
      return null;
    }
  }

  stateAuth(){
    return this.auth.onAuthStateChanged(()=>{
      
    });
  }

 usuariostateAuth(){
    return this.auth.onAuthStateChanged;
      
      //(user) => {
    //if (user) {
      // User is signed in.
      //this.usuarioperfil = user;
      //this.uid=user.uid;
      //const usuario:any=this.database.getUsuarioByID(this.uid) ;
      //console.log('usuariostateAuth()->',usuario.nombre)
      //this.usuarioIniciosesion();
    //} else {

      // No user is signed in.
      //
     // this.currentUser = null;
    //}
  //});
 }


 usuarioIniciosesion(){
  console.log('usuarioIniciosesion()',this.uid)
  return this.uid;

 }

  async getCorreo() {
    const correoU = await this.auth.currentUser;
    if (correoU) {
      return correoU.email;
    } else {
      return null;
    }
  }
  
  getUserProfile(){
    const user = this.auth.currentUser;
    return user;
  }

  verificacionRol(){
    const user = this.auth.currentUser.getIdTokenResult().then((idTokenResult) => {
       // Confirm the user is an Admin.
       if (!!idTokenResult.claims.admin) {
         // Show admin UI.
         //showAdminUI();
       } else {
         // Show regular user UI.
         //showRegularUI();
       }
    })
    .catch((error) => {
      console.log(error);
    });
  }

}