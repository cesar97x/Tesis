import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ResumenServiceService } from 'src/app/services/resumen-service.service';
import { Comentario } from '../../models/Note';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-lista-comentarios',
  templateUrl: './list-comentarios.page.html',
  styleUrls: ['./list-comentarios.page.scss'],
})
export class UsuarioListaComentariosPage implements OnInit {

  notes = []
  @ViewChild('popover') popover;
  rating3: number;
  public form: FormGroup;
  public isOpen = false;
  public contenidoComentario:String = ''

  constructor(private listaService : FirestoreService,
              private resumenService: ResumenServiceService,
              private loadingCtrl: LoadingController,) { 
         
  }


  ngOnInit() {
    this.listarComentarioService()
  }

  listarComentarioService(){
    
    const usercorreo = this.listaService.getUsuarioEmail();
    this.resumenService.listarComentariosUsuario(usercorreo).then(res=>{
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

}
