import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ResumenServiceService } from 'src/app/services/resumen-service.service';
import { format, parseISO } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comentario } from 'src/app/models/Note';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-resumen',
  templateUrl: './admin-resumen.page.html',
  styleUrls: ['./admin-resumen.page.scss'],
})
export class AdminResumenPage implements OnInit {

  //Parametros para mensajes e informacion
  public nombre: String = '';


  public notes = [];
  public agnosPersonalizados = [2020, 2016, 2008, 2004, 2000, 1996];
  public opcionesPersonalizas: any;
  public datos: FormGroup;

  public fechaInicio = '';
  public fechaFin='';
  public showPickerInicio = false;
  public showPickerFin = false;
  
  public dataValue = format(new Date(), 'yyyy-MM-dd');
  public dataValueTodayMax = format(new Date(), 'yyyy-MM-dd');
  public formattedStringInicio = '';
  public formattedStringFin = '';
  public isOpen = false;
  public contenidoComentario:String = ''
  public tipoFecha = false;
  public tipoBusquedaFiltro = 'Todos';
  public sentimientoFecha = ''


  constructor(private usurio: AuthService,
              private listaService : FirestoreService,
              private resumenService: ResumenServiceService,
              private fb: FormBuilder) {
    this.setToday()
  }
  
  setToday() {
    
    this.formattedStringInicio = format(parseISO(this.dataValue), 'yyyy-MM-d HH:mm:ss');
    this.formattedStringFin = format(parseISO(this.dataValue), 'yyyy-MM-d HH:mm:ss');
  }        

  ngOnInit() {
    this.listaService
    .getUsuarioByID(this.usurio.getUserProfile().uid)
    .subscribe((res) => {
      this.nombre = res.nombres;
    });
    this.obtenertodosComentarios()
    this.datos = this.fb.group({
      fechaInicioForm: ['', [Validators.required]],
      fechaFinForm: ['', [Validators.required]],
    });
  }
  
  obtenertodosComentarios(){
    this.listaService.getNotes().subscribe(res=>{this.notes = res;})
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
    this.showPickerInicio = false;
  }

  cambiarFechaFin(valorFecha) {
    this.dataValue = valorFecha;
    this.formattedStringFin = format(parseISO(valorFecha), 'yyyy-MM-d HH:mm:ss');
    this.showPickerFin = false;
    
  }

  async cargarResumenFechas() {
    await this.resumenService.listarComentarioPorFecha(this.formattedStringInicio, this.formattedStringFin).then(res=>{
      this.tipoFecha = true;
      this.notes = res as Array<Comentario>

    });;
  }

  async cargarResumenSentimientos(event: any) {
    await this.resumenService.listarComentarioPorSentimiento(event.detail.value).then(res=>{
      this.tipoFecha = true;
      this.notes = res as Array<Comentario>

    });
  }

  openModalComentario(note:Comentario, isOpen: boolean) {
    this.contenidoComentario = note.comentario_completo;
    this.isOpen = isOpen;
  }

  setOpen(isOpen: boolean) {
    this.isOpen = isOpen;
  }

  tipoBusqueda(event: any) {
    if(event.detail.value == 'Todos'){
      this.tipoFecha= false
      this.tipoBusquedaFiltro = event.detail.value
      this.obtenertodosComentarios()
    }else{
      this.tipoBusquedaFiltro = event.detail.value
    }
    
  }

  async cargarResumenFechasSentimiento(){
    await this.resumenService.listarComentarioPorFechaSentimiento(this.formattedStringInicio, this.formattedStringFin, this.sentimientoFecha).then(res=>{
      this.tipoFecha = true;
      this.notes = res as Array<Comentario>

    });;
  }

  actualizarValoresBusquedas(event: any) {
    this.sentimientoFecha = event.detail.value
  }

}
