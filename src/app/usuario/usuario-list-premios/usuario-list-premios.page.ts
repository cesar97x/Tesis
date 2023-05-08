import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { PuntajeI } from 'src/app/models/Puntaje';
import { usuarioI } from 'src/app/models/game';
import { PremioI } from 'src/app/models/premio';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-usuario-list-premios',
  templateUrl: './usuario-list-premios.page.html',
  styleUrls: ['./usuario-list-premios.page.scss'],
})
export class UsuarioListPremiosPage implements OnInit {
  private path: string = 'Premios/';
  public puntosactuales: number = 0;
  newPremio: PremioI = {
    nombre: '',
    puntos: null,
    imagen: 'sin ruta aun'

  }

  puntajeupdate: PuntajeI;
  cliente: usuarioI = {
    nombres: null,
    apellido: null,
    email: null,
    fechaNacimiento: null,
    uid: null,
    perfil: null,
    direccion: null,
    genero: null,
    edad: null
  }
  nowpuntaje: PuntajeI = {
    id: null,
    cliente: null,
    puntajetotal: 0
  }
  premios: PremioI[] = [];
  uid = ''
  public puntaje: number = 0;

  private pathpedido: string = 'Pedidos/'

  constructor(
    private authService: AuthService,
    private database: FirestoreService,
    private premio: PedidoService,
    private alertController: AlertController,
    private toastController: ToastController

  ) {
    this.loadPremios();
  }

  async ngOnInit() {

    this.uid = await this.authService.getUid();
    console.log('usuario en perfil ontenido en listade premios--->==>', this.uid)
    this.loadCliente(this.uid)
    //this.obtenerPuntajebyUsuarioOf(this.uid)
    this.Nowrecuperapuntosusuarios(this.uid)

  }

  loadPremios() {
    this.database.getDoc<PremioI>(this.path).subscribe(res => {
      console.log('->', res)
      this.premios = res
    });
  }


  async hacerpedido(premio: PremioI) {



    console.log('haciendo pedido.......')
    if (premio.puntos > this.nowpuntaje.puntajetotal) {
      this.presentToast('No tienes los suficientes puntos');
    } else {
      //const restatotal = this.nowpuntaje.puntajetotal -= premio.puntos;
      this.puntajeupdate = {
        id: this.uid,
        cliente: this.cliente,
        puntajetotal: premio.puntos

      }

      const alert = await this.alertController.create(
        {


          header: 'Solicitar Premio',
          message: '<strong>' + premio.puntos + ' puntos' + '</strong> seran restados  de sus puntos Actuales',
          buttons: [
            {
              text: 'cancelar',
              role: 'cancel',
              handler: (blah) => {
                this.alertController.dismiss();
              }
            },
            {
              text: 'OK',
              handler: (blah) => {

                //const suma=this.puntaje+=1000
                //console.log('suma puntaje'+suma)
                //this.sumarPuntaje(premio.puntos);
                
                this.premio.realizarPedido(premio, this.cliente, this.pathpedido).then(
                  res => {
                    console.log('res--->', res)
                    this.presentToast('Solicitud con exito');
                    //this.alertController.dismiss();

                  }

                ).catch(error => {
                  this.presentToast('No se pudo realizar la Solicitud');
                });

                this.NowcreateandUpdate(this.puntajeupdate)
              }

            }
          ],
        });
      await alert.present();
    }
  }

  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 1500,
      color: 'light'
    });

    await toast.present();
  }

  loadCliente(id: string) {
    console.log('uid-------------', this.uid)
    const path = 'users/'
    const info: any = this.database.getDocUsu<usuarioI>(path, id).subscribe(res => {
      console.log('uressssss lista premios --->', res)
      this.cliente = res;
    });
  }

  sumarPuntaje(valor: number) {
    var suma: number = 0;
    suma += valor
    console.log("suma-------->>>>>>>>", suma)
    return suma++
  }



  Nowrecuperapuntosusuarios(uid: string) {
    //console.log('uid-------------',uid)
    const path = 'PuntajeActual/'
    //const id = 'asddasfdasf'
    const info: any = this.database.getDocUsu<PuntajeI>(path, uid).subscribe(res => {
      //this.nowpuntaje = res
      console.log("puntaje de usuario@@@@@", this.nowpuntaje)
      //borar if si no funciona
      if(res){
        //descomentar if de arriba sibooro todo el if
        this.nowpuntaje = res
      }else{
        var puntajealterno: PuntajeI = {
          id: null,
          cliente: null,
          puntajetotal: 0
        }
        this.nowpuntaje=puntajealterno

      }
    });
    //console.log('puntaje usuario --->',info)

  }

  NowcreateandUpdate(puntos: PuntajeI) {

    //console.log('uid-------------',uid)
    const path = 'PuntajeActual/'
    //const id='asddasfdasf'

    if (this.nowpuntaje) {
      console.log('------> actulizando')
      console.log('------> score ganado', puntos.puntajetotal)
      console.log('------> score almacenado', this.nowpuntaje.puntajetotal)

      const restatotal = this.nowpuntaje.puntajetotal -= puntos.puntajetotal;
      console.log('------> sumatotal', restatotal)
      const puntajenew: PuntajeI = {
        id: puntos.id,
        cliente: puntos.cliente,
        puntajetotal: restatotal

      }
      this.database.updateDoc(puntajenew, path, this.uid)


    } else {
      console.log('------> creando')
      this.database.createpuntaje(puntos, this.uid)
    }

    //this.puntaje=res;
    //console.log('puntaje usuario --->',this.puntaje)


    //console.log('puntaje usuario --->',info)

  }

  getUserInfo(uid: string) {
    console.log('uid-------------', uid)
    const path = 'users/'
    const info: any = this.database.getDocUsu<usuarioI>(path, this.uid).subscribe(res => {
      console.log('uressssss --->', res)
      this.cliente = res;
    });
    console.log('usuario de inicio de sesion --->', info)
  }


}
