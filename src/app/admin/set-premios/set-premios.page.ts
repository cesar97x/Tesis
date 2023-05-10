import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { PremioI } from 'src/app/models/premio';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-set-premios',
  templateUrl: './set-premios.page.html',
  styleUrls: ['./set-premios.page.scss'],
})
export class SetPremiosPage implements OnInit {
  premios: PremioI[] = [];
  private path: string = 'Premios/';
  newPremio: PremioI = {
    nombre: '',
    puntos: null,
    imagen: 'sin ruta aun'

  }

  actualizar: boolean;
  enablenewpremio=false;
  loading:any;
  newImage='';
  newFile:any;
  constructor(
    private database: FirestoreService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getPremios();
    this.actualizar = false;
  }

  newproducto(){
    this.newPremio = {
      nombre: '',
      puntos: null,
      imagen: ''

    }
    this.enablenewpremio=true;
    this.actualizar = false;
    
  }

  formeditar(premio: PremioI) {
    this.newPremio = premio;
    this.actualizar = true;
    this.enablenewpremio=true;

  }

  async guardarpremios() {
    console.log('->', this.newPremio)
    if (this.newPremio.nombre != '') {
      this.presentLoading();
      const nameim=this.newPremio.nombre;
      const res= await this.database.uploadImage(this.newFile,this.path,nameim);
      this.newPremio.imagen=res;
      
      this.database.addDocumento(this.newPremio, this.path).then(
        res=>{
          console.log('res--->',res)
          this.loading.onDidDismiss();
          this.presentToast('guardado con exito');
  
        }
      ).catch(error=>{
        this.presentToast('no se pudo guardar');
      });
    }
  }

  getPremios() {
    this.database.getDoc<PremioI>(this.path).subscribe(res => {
      console.log('->', res)
      this.premios = res
    });
  }
  async editar() {
    const nameim=this.newPremio.nombre;
    const imagen = this.newPremio.imagen
    //console.log('oimagen para editar',imagen)
    //const res= await this.database.uploadImage(this.newFile,this.path,nameim);
    //console.log("res---->",res)
    //this.newPremio.imagen=res;
    this.database.updateDoc(this.newPremio, this.path, this.newPremio.id);
    this.newPremio = {
      nombre: '',
      puntos: null,
      imagen: ''

    }
    this.actualizar = false;
    this.presentToast('guardado con exito');
    this.enablenewpremio=false;
  }

  async delete(premio: PremioI) {
    
      const alert = await this.alertController.create({
        
        header: 'Advertencia',
        message: 'Seguro desea <strong> eliminar </strong>',
        buttons: [
          {
          text: 'cancelar',
          role:'cancel',
          handler: (blah) =>{
            //
          }
          },
          {
            text: 'OK',
            handler: () =>{
              this.database.deleteDoc(this.path, premio.id).then(
                res=>{
                  this.presentToast('eliminado con exito');
                  this.alertController.dismiss();
                }
              ).catch(error=>{
                this.presentToast('no se pudo eliminar');
              });
            }

          }
        ],
      }); 
      await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'guardando...',
      duration: 800,
    });

     await this.loading.present();
    //await loading.onDidDismiss();
  }

  async presentToast(msj:string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 1500,
      color:'light'
    });

    await toast.present();
  }


  async newImageUpload(event:any){
    if(event.target.files && event.target.files[0]){
      this.newFile=event.target.files[0];
      const reader = new FileReader();
      reader.onload=((image)=>{
        this.newPremio.imagen=image.target.result as string;
        
      });
      reader.readAsDataURL(event.target.files[0])
    }
    

  }


  

  

  

}
