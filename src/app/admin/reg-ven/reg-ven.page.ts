import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Producto } from 'src/app/models/Producto';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ResumenServiceService } from 'src/app/services/resumen-service.service';

@Component({
  selector: 'app-reg-ven',
  templateUrl: './reg-ven.page.html',
  styleUrls: ['./reg-ven.page.scss'],
})
export class RegVenPage implements OnInit {

  public nombre: String = '';

  value = "hhhhhhhhh";
  public reporte1 = ""
  comen: FormGroup;
  // public producto = "";
  public desplegarComida = true;
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
  selectProducto: string = '';

  constructor(
    private usurio: AuthService,
    private fbb: FormBuilder,
    private auth: Auth,
    private resumen: ResumenServiceService,
    private alertController: AlertController,
    private router: Router,
    private listaService: FirestoreService,
    private loadingCtrl: LoadingController) {
  }

  get reporte() {
    return this.comen.get('reporte');
  }

  ngOnInit() {
    this.listaService
      .getUsuarioByID(this.usurio.getUserProfile().uid)
      .subscribe((res) => {
        this.nombre = res.nombres;
      });
    this.obtenerPlatos();
    this.comen = this.fbb.group(
      {
        reporte: ['', [Validators.required, Validators.minLength(1)]]
      }
    );
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Estamos guardando tu reporte, espera un momento por favor',
      duration: 500
    });

    loading.present();
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();

  }

  obtenerPlatos() {
    this.listaService.getProductos().subscribe(res => { this.productos = res; })
  }

  async guadarValoresAdministrador() {
    const response = await this.resumen.guardarComentarioAdministrador(this.auth.currentUser.email, this.reporte.value, this.selectProducto);
    console.log("Tiene que dar true para guardar: --> " + response)
    if (response == 'True') {
      this.showAlertGuardaComentario(' Tús valores han sido guardados', 'Por favor, sigue agregando más valores');
    } else {
      this.showAlert('El valor no se guardo.', 'Por favor, Intente de nuevo!');
    }
  }

  async showAlertGuardaComentario(header, message) {

    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],

    });

    await alert.present();
    this.comen = this.fbb.group(
      {
        reporte: ['', [Validators.required, Validators.minLength(1)]]
      }
    );

  }

  onKey(event:any){
    this.contadorCaracteres = event.target.value.length
   
  }

}
