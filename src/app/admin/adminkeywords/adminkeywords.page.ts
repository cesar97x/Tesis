import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import Chart from 'chart.js/auto';
import { AuthService } from 'src/app/services/auth.service';
import { GraficaServiceService } from 'src/app/services/grafica-service.service';
import { AlertController, IonSelect, IonSelectOption, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-adminkeywords',
  templateUrl: './adminkeywords.page.html',
  styleUrls: ['./adminkeywords.page.scss'],
})
export class AdminkeywordsPage implements OnInit {

  public imagenKeywords1 = '';
  public servicio = '';
  public sentimientoValue = '';
  public sentimientoText = true;
  public habilitacionBoton = true;
  public texto = '';
  private url= `images/nubePalabras/palabrasGeneradas.png`
  public nombre: String = '';
  public loading = null;
  @ViewChild('sentimientoValue') sentimiento: IonSelect;
  public mejoresProductos = []
  public peoresProductos = []

  constructor(private alertController: AlertController, 
              private graficas: GraficaServiceService, 
              private usurio: AuthService, 
              private serviceStorage : FirestoreService,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.serviceStorage
      .getUsuarioByID(this.usurio.getUserProfile().uid)
      .subscribe((res) => {
        this.nombre = res.nombres;
      });

    this.mostrarImagen(this.url);
    this.obtenerMejoresyPeoresPlatos();
  }

  reset(){
    this.servicio = '';
    this.texto = '';
    this.sentimientoText = true;
    this.sentimiento.value = ''
    this.sentimientoValue = ''
    this.habilitacionBoton = true;
  }

  cargaServicio(event:any){
    //Habilita poder elegir
    this.sentimientoText = false;
    this.servicio = event.detail.value
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.imagenKeywords1 = this.imagenKeywords1
    }, 2000);
  }

  async presentAlert(titulo:string) {
    const alert = await this.alertController.create({
      header: titulo,
      buttons: [
        {
          text: 'OK',
          role: 'confirm'
        }
      ]
    });
    await alert.present();
    
  }


  cargaSentimientosPalabras(event:any){
    this.sentimientoValue = event.detail.value;
    this.habilitacionBoton = false;
  }


  obtenerimagencategoria(){
    this.showLoading()
     this.graficas.buscarComentariosCategoria('comentario',this.servicio, this.sentimientoValue).then(res=>{
      if('not exist' == res.rutaImg){
        this.presentAlert("No existen comentatarios");
        return;
      }
      this.presentAlert("Imagen lista :)");
      this.imagenKeywords1 = res.rutaImg
      const r = res.comentarios as any[]
      this.loading.dismiss();
      this.reset()
      
    }
    
    
    );
    
  }
  

  mostrarImagen(urlI){
    this.serviceStorage.traerImagenesStorage(urlI).then(res=>{
      this.imagenKeywords1 = res;
    });
  }
  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando imagen...',
      duration: 3500,
      cssClass: 'custom-loading'
    });
    
    this.loading.present();
  }

  filtrarComentario(){
    if (this.texto == '') {
      this.presentAlert("Ingresar algo para poder buscar, muchas gracias ");
      return;
    }
    this.showLoading();
    this.graficas.buscarComentarios('comentario',this.texto).then(res=>{
      if('not exist' == res.rutaImg){
        this.presentAlert("No existen comentatarios");
        return;
      }
      this.presentAlert("Imagen lista :)");
      this.imagenKeywords1 = res.rutaImg
      const r = res.comentarios as any[]
      this.loading.dismiss();
      this.reset()
    });
  }

  obtenerMejoresyPeoresPlatos(){
    this.graficas.obtencionMejoresPeoresProductos().then(res =>{
      this.mejoresProductos = res.mejores_productos as any[]
      this.peoresProductos = res.peores_productos as any[]
    });
  }

}
