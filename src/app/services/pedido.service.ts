import { Injectable } from '@angular/core';
import { PremioI } from '../models/premio';
import { PedidoI } from '../models/Pedido';
import { FirestoreService } from './firestore.service';
import { usuarioI } from '../models/game';
import { AuthService } from './auth.service';
import { addDoc, collection } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private pedido:PedidoI;
  cliente:usuarioI={
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
  uid='';

  constructor(
    private database:FirestoreService,
    private authService:AuthService,
    private firestore: Firestore
  ) {
    //this.loadCliente()
   }

   





  addPremio(premio: PremioI){

  }

  

 
 


  realizarPedido(premio:PremioI, cliente:usuarioI,path: string) {
    this.pedido={
      //id:this.uid,
      cliente:cliente,
      premio:premio,
      puntostotal:premio.puntos,
      estado:'enviado',
      fecha:new Date
    }
    const notesRef = collection(this.firestore, path);

    return addDoc(notesRef, this.pedido)
  }

}
