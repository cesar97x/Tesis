import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PedidoI } from 'src/app/models/Pedido';
import { usuarioI } from 'src/app/models/game';
import { PremioI } from 'src/app/models/premio';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-mispedidos',
  templateUrl: './mispedidos.page.html',
  styleUrls: ['./mispedidos.page.scss'],
})
export class MispedidosPage implements OnInit ,
OnDestroy{

  nuevosSuscriber:Subscription;
  culminadosSuscriber:Subscription;
  pedidosnuevos:PedidoI[]=[];
  pedidosculminados:PedidoI[]=[];
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
    const path='Pedidos/'
    const estado='enviado';
    const campo='estado'
    this.nuevosSuscriber=this.database.getCollectionQuery<PedidoI>(path,campo,estado,this.uid).subscribe(res=>{
      if(res.length){
        this.pedidosnuevos=res;

        console.log('pedidosNuevos--->',this.pedidosnuevos)
      }
    });

  }

  getpedidosculminados(){
    const path='Pedidos/'
    const estado='entregado';
    const campo='estado'
    this.culminadosSuscriber=this.database.getCollectionQuery<PedidoI>(path,campo,estado,this.uid).subscribe(res=>{
      if(res.length){
        //this.pedidosnuevos=[]
        this.pedidosnuevos=res;

        console.log('pedidosNuevos--->',this.pedidosnuevos)
      }else{
        this.pedidosnuevos=[]
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

  

}
