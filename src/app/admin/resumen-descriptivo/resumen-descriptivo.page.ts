import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ResumenServiceService } from 'src/app/services/resumen-service.service';
import { format, parseISO } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comentario } from 'src/app/models/Note';
import { AuthService } from 'src/app/services/auth.service';
import { Reporte } from 'src/app/models/Reporte';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumen-descriptivo',
  templateUrl: './resumen-descriptivo.page.html',
  styleUrls: ['./resumen-descriptivo.page.scss'],
})
export class ResumenDescriptivoPage implements OnInit {

  public reports = [];

  public agnosPersonalizados = [2020, 2016, 2008, 2004, 2000, 1996];
  public opcionesPersonalizas: any;
  public datos: FormGroup;
  //Parametros para mensajes e informacion
  public dataValue = format(new Date(), 'yyyy-MM-dd');
  public dataValueTodayMax = format(new Date(), 'yyyy-MM-dd');
  public nombre: String = '';
  public showPickerInicio = false;
  public tipoBusquedaFiltro = 'Todos';
  public formattedStringInicio = '';
  public tipoFecha = false;
  public reporteFecha = ''
  public plato: String = ''
  public isOpen = false;
  public cantidad = 0;
  public total = 0.0;


  constructor(private usurio: AuthService,
    private listaService: FirestoreService,
    private resumenService: ResumenServiceService,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    this.listaService
      .getUsuarioByID(this.usurio.getUserProfile().uid)
      .subscribe((res) => {
        this.nombre = res.nombres;
      });
    this.obtenertodosReportes();
    this.datos = this.fb.group({
      fechaInicioForm: ['', [Validators.required]]
    });
  }

  listarReporte() {
    this.datos.get('fechaForm').value;
  }

  obtenertodosReportes() {
    this.listaService.getReportes().subscribe(res => { this.reports = res; })
  }

  setToday() {
    this.formattedStringInicio = format(parseISO(this.dataValue), 'yyyy-MM-d');
  }

  get fechaInicioForm() {
    return this.datos.get('fechaInicioForm');
  }

  cambiarFechaInicio(valorFecha) {
    this.dataValue = valorFecha;
    this.formattedStringInicio = format(parseISO(valorFecha), 'yyyy-MM-d');
    this.showPickerInicio = false;
  }

  async cargarResumenFechaPlato() {
    
    await this.resumenService.listarReporteGeneral(this.reporteFecha, this.formattedStringInicio).then(res => {
      this.reports = res.reportes as Array<Reporte>
      this.cantidad = res.cantidad
      this.total = res.total
      this.tipoFecha = true
    })
    
  }

  openModalComentario(note: Reporte, isOpen: boolean) {
    this.plato = note.nombreProducto;
    this.isOpen = isOpen;
  }

  tipoBusqueda(event: any) {
    if (event.detail.value == 'Todos') {
      this.tipoFecha = false
      this.tipoBusquedaFiltro = event.detail.value
      this.obtenertodosReportes()
    } else {
      this.tipoBusquedaFiltro = event.detail.value
    }
    this.cantidad=0
    this.total=0
    this.reporteFecha=null
    this.formattedStringInicio=null
    this.refreshForm()
  }

  refreshForm(){
    this.datos.patchValue({
        fechaInicioForm: null, // does not work
    });
}

  actualizarValoresBusquedas(event: any) {
    this.reporteFecha = event.detail.value

  }

  setOpen(isOpen: boolean) {
    this.isOpen = isOpen;
  }

  salir() {
    this.usurio.logout();
    this.router.navigateByUrl('/login-page', { replaceUrl: true });
    console.log('salir')
  }
}
