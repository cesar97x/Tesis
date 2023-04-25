import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, AlertController, isPlatform, IonInput } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})

export class SingUpPage implements OnInit {

  public datos: FormGroup;
  public passwordValidacion = "";
  public password = "";
  public email = "";
  public gmailIcon = "../../assets/images/gmail.png";
  public passwordStrong = null;
  public passwordStrongVerificacion = null;
  @ViewChild('Password') passwordVista: IonInput;
  public labelMostrar = false;

  @ViewChild('PasswordConfirmacion') passwordVistaConfirmacion: IonInput;
  public labelMostrarConfirmacion = false;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {
    if (!isPlatform('capacitor')){
      GoogleAuth.initialize({
        clientId: '155971214151-58jinri3itmuf09mor4iq5jjiunbgcg8.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
      });


    }
   }

  ngOnInit() {
    this.datos = this.fb.group(
      {
        emailForm: ['', [Validators.required, Validators.email]],
        passwordForm: ['',[Validators.required, Validators.minLength(8)]],
        passwordValidacionForm: ['',[Validators.required, Validators.minLength(8)]], 
      }
    );
  }

  get emailForm(){
    return this.datos.get('emailForm');
  }

  get passwordForm(){
    return this.datos.get('passwordForm')
  }

  get passwordValidacionForm(){
    return this.datos.get('passwordValidacionForm')
  }

  get nombresForm(){
    return this.datos.get('nombresForm')
  }

  get apellidosForm(){
    return this.datos.get('apellidosForm')
  }
  
  public mostrarPassword(){
    this.passwordVista.type = 'text';
    this.labelMostrar = true;
  }

  public ocultarPassword(){
    this.passwordVista.type = 'password';
    this.labelMostrar = false;
  }

  public mostrarPasswordConfirmacion(){
    this.passwordVistaConfirmacion.type = 'text';
    this.labelMostrarConfirmacion = true;
  }

  public ocultarPasswordConfirmacion(){
    this.passwordVistaConfirmacion.type = 'password';
    this.labelMostrarConfirmacion = false;
  }

  public validarRobustezPassword(eventoTeclado){
    var passwordTeclado = eventoTeclado.target.value;
    
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    
    if(strongRegex.test(passwordTeclado)) {
        this.passwordStrong = "success";
    } else if(mediumRegex.test(passwordTeclado)) {
        this.passwordStrong = "warning";
    } else {
        this.passwordStrong = "danger";
    }

  }

  public validarIgualdadPassword(eventoTeclado){
    var passwordTeclado = eventoTeclado.target.value;
    
   
    if(passwordTeclado==this.password) {
        this.passwordStrongVerificacion = "success";
    } else {
        this.passwordStrongVerificacion = "danger";
    }

  }

  async register() {
  
    const user = await this.authService.register(this.email, this.password);
    if (user) {
      this.router.navigateByUrl('/usuario-add-info', { replaceUrl: true });
    } else {
      this.showAlert('Registro Fallido', 'Por favor, Intente de nuevo!');
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


  public registrarConFacebook(){
    console.log("entra al metodo login: "+this.email+" "+this.password);
  }

  async registrarConGoogle(){
    await this.authService.registrarConGoogle();
    //this.router.navigateByUrl('usuario-add-info', { replaceUrl: true });
  }

}
