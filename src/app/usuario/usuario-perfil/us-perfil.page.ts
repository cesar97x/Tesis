import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { format, parseISO } from 'date-fns';
import { Usuario } from '../../models/Usuario';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ResumenServiceService } from 'src/app/services/resumen-service.service';
import { Comentario } from 'src/app/models/Note';
import { PerfilInterface } from 'src/app/models/UserInterface';
import { usuarioI } from 'src/app/models/game';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './us-perfil.page.html',
  styleUrls: ['./us-perfil.page.scss'],
})
export class UsuarioPerfilPage implements OnInit {
  mostrarIcon=[1,2,3,4];
  notes = [];
  totalComentarios= 0;
  public urlComentario='';
  public comentarioSegunCategoria='';
  public contenidoSegunCategoria = '';

  public fechaNacimiento = '';
  public selectedGenero = '';
  public datos: FormGroup;
  public nombres = '';
  public apellidos = '';
  public direccion = '';
  public showPicker = false;
  public dataValue = format(new Date(), 'yyyy-MM-dd');
  public dataValueTodayMax = format(new Date(), 'yyyy-MM-dd');
  public formattedString = '';
  selectedMode = 'date';
  public userAccount = null;
  uid='';
  namegog='';

  usuarioperfil:usuarioI={
    nombres:null,
    apellido:null,
    email:null,
    fechaNacimiento: null,
    uid:null,
    perfil:null,
    direccion : null,
    genero : null,
    edad: null
  }
 

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private database: FirestoreService,
    private router: Router,
    private alertController: AlertController,
    private listaService : FirestoreService,
    private resumenService: ResumenServiceService,
  ) {

    //this.authService.usuariostateAuth.
    //this.obteneiddeusuario();
    this.traerusuarioxgoogle()
    this.setToday();
   
  }

  setToday() {
    this.formattedString = format(parseISO(this.dataValue), 'yyyy-MMMM-d');
  }

  //user: any;
  traerusuarioxgoogle(){
    
    console.log('pruebba b->',this.authService.stateAuth.toString)
  }

   async ngOnInit() {
    //****para recuperar un usaurio o el q iniciosesion */
    this.uid = await this.authService.getUid();

    this.namegog = await this.authService.getname();
    console.log('usuario en perfil ontenido--->==>',this.uid)
    this.getUserInfo(this.uid);
   
    //****para recuperar un usaurio o el q iniciosesion */

    
    this.listarComentarioService()



    this.userAccount = this.authService.getUserProfile();
    this.datos = this.fb.group({
      nombresForm: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
        ],
      ],
      apellidosForm: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
        ],
      ],
      direccionForm: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
        ],
      ],
      fechaForm: ['', [Validators.required]],
      generoForm: ['', [Validators.required]],
    });
  }
  
  public guardarInformacion() {
    const userNew: Usuario = new Usuario();
    userNew.nombres = this.datos.get('nombresForm').value;
    userNew.apellido = this.datos.get('apellidosForm').value;
    userNew.direccion = this.datos.get('direccionForm').value;
    userNew.fechaNacimiento = this.datos.get('fechaForm').value;
    userNew.genero = this.datos.get('generoForm').value;
    userNew.calcularEdad();
    userNew.email = this.userAccount.email;
    userNew.uid = this.userAccount.uid;
    const usercreado = this.database.addUsuario(userNew);
    if (usercreado) {
      this.router.navigateByUrl('/usuario-menu', { replaceUrl: true });
    } else {
      this.showAlert('Registro Fallido', 'Por favor, Intente de nuevo la actualizacion!');
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

  get nombresForm() {
    return this.datos.get('nombresForm');
  }

  get apellidosForm() {
    return this.datos.get('apellidosForm');
  }

  get direccionForm() {
    return this.datos.get('direccionForm');
  }

  get fechaForm() {
    return this.datos.get('fechaForm');
  }

  get generoForm() {
    return this.datos.get('generoForm');
  }

  cambiarFecha(valorFecha) {
    this.dataValue = valorFecha;
    this.formattedString = format(parseISO(valorFecha), 'yyyy-MMMM-d');
    this.showPicker = false;
  }

  eleccionGeneroUsuario(seleccionGenero) {
    this.selectedGenero = seleccionGenero;
  }

  ///////////////////////////////////////////////////////////////

  listarComentarioService(){
    
    const usercorreo = this.listaService.getUsuarioEmail();
    this.resumenService.listarComentariosUsuario(usercorreo).then(res=>{
      this.notes = res as Array<Comentario>
      this.totalComentarios= this.notes.length
      this.mostrarIconGanador(this.totalComentarios)
    });
  }

  mostrarIconGanador(contador){

    if (contador<10){
      this.urlComentario = "../../assets/icon/happy-outline.svg";
      this.comentarioSegunCategoria= 'Tu categoria es:  Cliente normal. '
      this.contenidoSegunCategoria= ' Por favor sigue comentado para desbloquear tus premios.  '
    }else  if (contador>=10){
      this.urlComentario = "../../assets/icon/plato.svg";
      this.comentarioSegunCategoria= 'Tu categoria es: Cliente Plata.'
      this.contenidoSegunCategoria=' Muestra tu insignia dentro del restaurante para recibir tu premio. Recuerda seguir comentando obtener más premios '

    }else if (contador>=20){
      this.urlComentario = "../../assets/icon/barra-de-oro.svg";
      this.comentarioSegunCategoria= 'Tu categoria es:  Cliente Oro.' 
      this.contenidoSegunCategoria= 'Muestra tu insignia dentro del restaurante<bR> para recibir tu premio. Recuerda seguir comentando obtener más premios  '

    }else if (contador>=50){
      this.urlComentario = "../../assets/formasIcon/diamante.svg";
      this.comentarioSegunCategoria= 'Tu categoria es:  Cliente Diamante.'
      this.contenidoSegunCategoria= ' Muestra tu insignia dentro del restaurante para recibir tu premio.Recuerda seguir comentando obtener más premios '

    }
  }
  

  salir(){
    
    this.authService.logout();
    this.router.navigateByUrl('/login-page', { replaceUrl: true });
    console.log('salir')
  }

  

  getUserInfo(uid:string){
    console.log('uid-------------',uid)
    const path='users/'
    const info:any =this.database.getDocUsu<usuarioI>(path,this.uid).subscribe(res=>{
      console.log('uressssss --->',res)
      this.usuarioperfil=res;
    });
    console.log('usuario de inicio de sesion --->',info)
  }

}
