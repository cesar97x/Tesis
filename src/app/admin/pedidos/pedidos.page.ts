import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EstadoPedido, PedidoI } from 'src/app/models/Pedido';
import { usuarioI } from 'src/app/models/game';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit,OnDestroy {
nuevosSuscriber:Subscription;
  culminadosSuscriber:Subscription;
  pedidosnuevos:PedidoI[]=[];
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

 uid=''
 estados:EstadoPedido[]=['entregado','enviado']


  constructor(
    private database:FirestoreService,
    private authService:AuthService
  ) { }

 async  ngOnInit() {
    this.uid = await this.authService.getUid();
    console.log('usuario en perfil ontenido en listade premios--->==>',this.uid)
    this.loadCliente(this.uid)
    this.getpedidosnuevos()
  }

  async  ngOnDestroy() {
    if(this.nuevosSuscriber){
      this.nuevosSuscriber.unsubscribe();
    }
    if(this.culminadosSuscriber){
      this.culminadosSuscriber.unsubscribe();
    }
  }

  changeselect(event:any){
    console.log('changeselect()',event.detail.value)
    const opc=event.detail.value;
    if(opc=="culminados"){
      this.getpedidosculminados();
    }
    if(opc=="nuevos"){
      this.getpedidosnuevos();
    }
  }

  getpedidosnuevos(){
    const path='Pedidos'
    const estado='enviado';
    const condicion='=='
    const campo='estado'
    this.nuevosSuscriber=this.database.getCollectionAll<PedidoI>(path,campo,condicion,estado).subscribe(res=>{
      if(res.length){
        this.pedidosnuevos=res;


        console.log('pedidosNuevos--->',this.pedidosnuevos)
      }
    });

  }

  getpedidosculminados(){
    const path='Pedidos'
    const estado='entregado';
    const condicion='=='
    const campo='estado'
    this.culminadosSuscriber=this.database.getCollectionAll<PedidoI>(path,campo,condicion,estado).subscribe(res=>{
      if(res.length){
        this.pedidosnuevos=res;

        console.log('culminados--->',this.pedidosnuevos)
      }
    });
  }

  loadCliente(id:string){
    console.log('uid-------------',this.uid)
    const path='users/'
    const info:any =this.database.getDocUsu<usuarioI>(path,id).subscribe(res=>{
      console.log('uressssss lista premios --->',res)
      this.cliente=res;
    });
  }

  cambiarEstado(pedido:PedidoI,event:any){

    console.log("cambiando estado....")
    
    var estadop:EstadoPedido;
    estadop=event.detail.value;

    console.log('event->',event)
    console.log('id->',pedido.id)
    const path='Pedidos/';
    const updateDoc={
      estado:estadop,
    };
    const id=pedido.id;
    this.database.updateDoc(updateDoc,path,id).then(()=>{
      console.log('actualizado con exito')
    });
  }
}
