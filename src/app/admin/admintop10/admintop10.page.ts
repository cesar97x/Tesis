import { Component, OnInit} from '@angular/core';
import { ResumenServiceService } from 'src/app/services/resumen-service.service';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comentario } from 'src/app/models/Note';


@Component({
  selector: 'app-admintop10',
  templateUrl: './admintop10.page.html',
  styleUrls: ['./admintop10.page.scss'],
})
export class Admintop10Page implements OnInit {

  public nombre: String = '';
  public token: string = '';
  public comentariosObtenidos = []
  public loading = null;
  public fechaInicio = '';
  public fechaFin='';
  public datos: FormGroup;


  public dataValue = format(new Date(), 'yyyy-MM-dd');
  public dataValueTodayMax = format(new Date(), 'yyyy-MM-dd');
  public formattedStringInicio = '';
  public formattedStringFin = '';
  public isOpen = false;
  public comentarioSelect:any = ''
  public showPickerInicio = false;
  public showPickerFin = false;
  public listaFiltrada = true;

  constructor(private usurio: AuthService, 
    private serviceStorage : FirestoreService,
    private resumen: ResumenServiceService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private router: Router
     ) { 
    
      this.setToday()  
  }

  ngOnInit() {
    this.serviceStorage
      .getUsuarioByID(this.usurio.getUserProfile().uid)
      .subscribe((res) => {
        this.nombre = res.nombres;
      });
      this.obtenerComentariosFacebook()
      this.datos = this.fb.group({
        fechaInicioForm: ['', [Validators.required]],
        fechaFinForm: ['', [Validators.required]],
      });

  }

  setToday() {
    
    this.formattedStringInicio = format(parseISO(this.dataValue), 'yyyy-MM-d HH:mm:ss');
    this.formattedStringFin = format(parseISO(this.dataValue), 'yyyy-MM-d HH:mm:ss');
  }

  get fechaInicioForm() {
    return this.datos.get('fechaInicioForm');
  }
  get fechaFinForm() {
    return this.datos.get('fechaFinForm');
  }

  listarComentario(){
    this.datos.get('fechaForm').value;
  }

  cambiarFechaInicio(valorFecha) {
    this.dataValue = valorFecha;
    this.formattedStringInicio = format(parseISO(valorFecha), 'yyyy-MM-d HH:mm:ss');
    this.showPickerInicio=false
  }

  cambiarFechaFin(valorFecha) {
    this.dataValue = valorFecha;
    this.formattedStringFin = format(parseISO(valorFecha), 'yyyy-MM-d HH:mm:ss');
    this.showPickerFin=false
  }


  obtenerComentariosFacebook(){
    this.comentariosObtenidos = []
    this.resumen.obtenerComentariosFacebookAPI().then(res=>{
      const comentarios = res.comentario_completo as []
      const fechaComentario = res.fecha_comentario as []
      const id_pagina_post = res.idPagina_idPost as []
      const profileName = res['Id Facebook'] as []
      const categoria = res.categoriaComentario as []
      const producto = res.nombreProducto as []
      const imagen = res.imagen as []
      for (let index = 0; index < comentarios.length; index++) {
        this.comentariosObtenidos.push([comentarios[index],fechaComentario[index],
                                        id_pagina_post[index],profileName[index],
                                        categoria[index], producto[index], imagen[index]])
      }
      this.listaFiltrada = false;
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Analizar Comentarios!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => { this.guardarComentariosFacebook()}
        }
      ]
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  
  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Esto tomara un timepo, no cierre la apliación...',
      duration: 650000,
      cssClass: 'custom-loading'
    });
    
    this.loading.present();
  }

  guardarComentariosFacebook(){
    console.log("OK")
    this.showLoading()
    this.resumen.guardarComentariosFacebookAPI().then(res=>{
      this.loading.dismiss();
      this.notificacionAviso()

    })
  }
  async notificacionAviso() {
    const alert = await this.alertController.create({
      header: 'Comentarios Almacenados',
      buttons: [
        {
          text: 'OK',
          role: 'confirm', 
          handler: () => {this.router.navigateByUrl('/admin-menu/admin-perfil', { replaceUrl: true });}
        }
      ]
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  async buscarComentariosFacebook(){
    this.comentariosObtenidos = []
    await this.resumen.filtrarComentariosFacebookFecha(this.formattedStringInicio, this.formattedStringFin).then(res=>{
      this.listaFiltrada = true;  
      this.comentariosObtenidos = res as Array<Comentario>
    });
  }

  openModalComentario(item:any, isOpen: boolean) {
    this.comentarioSelect = item;
    this.isOpen = isOpen;
  }

  setOpen(isOpen: boolean) {
    this.isOpen = isOpen;
  }

}