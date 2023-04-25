import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ResumenServiceService } from 'src/app/services/resumen-service.service';
import { FirestoreService } from '../../services/firestore.service';




@Component({
  selector: 'app-usuario-comentario',
  templateUrl: './us-comentario.page.html',
  styleUrls: ['./us-comentario.page.scss'],
})
export class UsuarioComentarioPage implements OnInit {
  
  value = "hhhhhhhhh";
  public comentario1=""
  comen: FormGroup;
  public categoriaComentario = "general";
  public desplegarComida = false;
  public contadorCaracteres = 0; 
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  slideOpts2 = {
    initialSlide: 1,
    speed: 400
  };
  public productos = [];

  
  constructor(private fbb: FormBuilder,
              private auth: Auth,
              private resumen : ResumenServiceService,
              private alertController: AlertController,
              private router: Router,
              private listaService : FirestoreService,
              private loadingCtrl: LoadingController
    ) 
    {

    }


  get comentario(){
        return this.comen.get('comentario');
  }  
  
      
         
  ngOnInit() {
   // this.authService.stateUser().subscribe(res =>{
     // console.log('estado', res)
    //})
    this.comen = this.fbb.group(
      {
        comentario: ['', [Validators.required, Validators.minLength(3)]]      }
    );
  }

 
  onKey(event:any){
    this.contadorCaracteres = event.target.value.length
   
  }
  
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Estamos guardando tu comentario, espera un momento por favor',
      duration: 7000
    });
    
    loading.present();
  }


  async guadarComentario(){
    const usercorreo = this.auth.currentUser.email;
    const comentarioValor = this.comentario.value;
    this.resumen.tipoComentarioApiRest(comentarioValor).then(async res=>{
      console.log("res: ",res)
      const response= await this.resumen.guardarComentario( usercorreo, comentarioValor, res.results[0].label, this.categoriaComentario);
      console.log("Tiene que dar true para guardar: --> "+response)
      if (response=='True') {
        this.showAlertGuardaComentario(' Tú comentario ha sido guardado','Por favor, sigue agregando más comentarios');
      } else {
        this.showAlert('El comentario no se guardo.', 'Por favor, Intente de nuevo!');
      }  
    })
  }

  async guadarComentarioComidaPlato(plato: any){
    console.log("categoriaComentario: "+this.categoriaComentario + " producto: "+ plato.nombreProducto)
    
    const usercorreo = this.auth.currentUser.email;
    const comentarioValor = this.comentario.value;
    console.log(plato);
    
    this.resumen.tipoComentarioApiRest(comentarioValor).then(async res=>{
      const response= await this.resumen.guardarComentarioProductoRestaurante(usercorreo, comentarioValor, res.results[0].label, this.categoriaComentario, plato.nombreProducto);
      if (response=='True') {
        this.showAlertGuardaComentario(' Tú comentario ha sido guardado','Por favor, sigue agregando más comentarios');
      } else {
        this.showAlert('El comentario no se guardo.', 'Por favor, Intente de nuevo!');
      }  
    })
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();

  }  

  async showAlertGuardaComentario(header, message){

    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],

    });

    await alert.present();
    //this.router.navigateByUrl('/usuario-menu/usuario-comentario', { replaceUrl: true });
    this.comen = this.fbb.group(
      {
        comentario: ['', [Validators.required, Validators.minLength(100)]]      }
    );

  }  
  
  seleccionCategoria(event:any){
    this.categoriaComentario = event.detail.value;
    this.comen = this.fbb.group(
      {
        comentario: ['', [Validators.required, Validators.minLength(100)]]      }
    );
    if(event.detail.value == 'Comida'){
      this.desplegarComida = true; 
      this.obtenerPlatos();
      return;
    }   
    this.desplegarComida = false; 
  }

  obtenerPlatos(){
    this.listaService.getProductos().subscribe(res=>{this.productos = res;})
  }

}