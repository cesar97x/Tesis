import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ResumenServiceService } from 'src/app/services/resumen-service.service';
import { format, parseISO } from 'date-fns';
import { Reporte } from 'src/app/models/Reporte';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporte-predictivo',
  templateUrl: './reporte-predictivo.page.html',
  styleUrls: ['./reporte-predictivo.page.scss'],
})
export class ReportePredictivoPage implements OnInit {

  public nombre: String = '';
  public reports = [];

  public agnosPersonalizados = [2020, 2016, 2008, 2004, 2000, 1996];
  public opcionesPersonalizas: any;
  public datos: FormGroup;
  //Parametros para mensajes e informacion
  public dataValue = format(new Date(), 'yyyy-MM-dd');
  public dataValueTodayMax = format(new Date(), 'yyyy-MM-dd');
  public showPickerInicio = false;
  public tipoBusquedaFiltro = 'Todos';
  public formattedStringInicio = '';
  public tipoFecha = false;
  public reporteFecha = ''
  public reporteEvento = ''
  public isOpen = false;
  public totales = [];

  constructor(private usurio: AuthService,
    private listaService : FirestoreService,
    private resumenService: ResumenServiceService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.listaService
    .getUsuarioByID(this.usurio.getUserProfile().uid)
    .subscribe((res) => {
      this.nombre = res.nombres;
    });
    this.datos = this.fb.group({
      fechaInicioForm: ['', [Validators.required]]
    });
  }

  setToday() {
    this.formattedStringInicio = format(parseISO(this.dataValue), 'yyyy-MM-d HH:mm:ss');
  } 

  get fechaInicioForm() {
    return this.datos.get('fechaInicioForm');
  }

  cambiarFechaInicio(valorFecha) {
    this.dataValue = valorFecha;
    this.formattedStringInicio = format(parseISO(valorFecha), 'yyyy-MM-d HH:mm:ss');
    this.showPickerInicio = false;
  }

  tipoBusqueda(event: any) {
    if(event.detail.value == 'Todos'){
      this.tipoFecha= false
      this.tipoBusquedaFiltro = event.detail.value
    }else{
      this.tipoBusquedaFiltro = event.detail.value
    }
  }

  actualizarValoresBusquedas(event: any) {
    this.reporteFecha = event.detail.value
    console.log("LLega a seleccionar plato: "+ this.reporteFecha);
    
  }

  actualizarValoresEvento(event: any) {
    this.reporteEvento = event.detail.value
    console.log("LLega a seleccionar plato: "+ this.reporteEvento);
    
  }

  async cargarMetodoPredictivo() {
    await this.resumenService.predecirReportes(this.formattedStringInicio, this.reporteEvento).then(res => {
      // this.reports = res.reportes as Array<Reporte>
      this.totales = res.totales
      this.tipoFecha = true;
      
    });;
  }

  platos=['Almuerzos','Camaron apanado','Chuleta Frita','Desayunos','Jugos','Meriendas','Pescado Frito','Pizza','Seco de Carne','Seco de Pollo']

  salir() {
    this.usurio.logout();
    this.router.navigateByUrl('/login-page', { replaceUrl: true });
    console.log('salir')
  }
}
