import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
// Importación necesaria para mensajes flash.
import { ToastController } from '@ionic/angular';
// Importación necesaria para alerts.
import { AlertController } from '@ionic/angular';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-ahorcadogame',
  templateUrl: './ahorcadogame.page.html',
  styleUrls: ['./ahorcadogame.page.scss'],
})
export class AhorcadogamePage  {
  limite:number=1000;
  min: number=0;
  max: number=0;
  score: number=0;
  timer: any;
  timerObs: any;

  // Definimos las variables
  letra: string = '';
  nombres: any = ['COCHE', 'CASA', 'PERRO', 'GATO', 'MURCIELAGO', 'IGUANA', 'SALTAMONTES', 'ESPEJO', 'LATIGO', 'ESPERANZA'];
  nombreSecreto: any = this.palabraAleatoria(0, this.nombres.length - 1);
  palabra: any = '';
  muestraHuecos: any = this.muestraHuecosPalabra();
  mensaje: string = '';
  letras_utilizadas: string = '';
  nombresecretomostrar: string = '';

  vidas: number = 6;
  puntos: number = 0;
  ganador: number = 0;
  imagen: number = 1;

  durationMessages: number = 3000;

  // Creamos un array para guardar las letras que se van seleccionando.
  controlLetras = new Array();

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public alertController: AlertController
  ) {
    this.startGame();
  }

  //Metodo Tiempo H:m:s
  texto:String="";
  public convertirSegundos(segundos: number) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
  this.texto=horas+"h:"+minutos+"m:"+segundosRestantes+"s"
    return { horas, minutos, segundos: segundosRestantes };
  }

  //Metodo tiempo inicio juego
  startGame() {
    this.exitTimer();
    this.score = 0;
    this.timer = { current: 0, max: this.limite };
    

    const everySecond: Observable<number> = timer(0, 1000);
    this.timerObs = everySecond.subscribe((seconds) => {
      this.timer.current++;
      this.convertirSegundos(this.timer.current)
      if (this.timer.current === this.limite) {
        this.exitTimer();
        //this.gameFinished();
      }
    });

  }

//METODO Fin de tiempo 
  exitTimer() {
    this.timerObs?.unsubscribe();
  }


  // Método que valida la letra seleccionada.
  public async compruebaLetra() {
    // Formateamos a mayúsculas para mejorar la legibilidad.
    let letraMayusculas = this.letra.toUpperCase();

    // Si se ha seleccionado una letra...
    if (letraMayusculas) {
      if (this.controlLetras.indexOf(letraMayusculas) == -1) {
        // Recorremos las letras de la palabra (array), para detectar si la letra se encuentra en ella.
        if (this.nombreSecreto.indexOf(letraMayusculas) != -1) {
          let nombreSecretoModificado = this.nombreSecreto;
          let posicion = new Array();
          let posicionTotal = 0;

          let contador = 1;

          while (nombreSecretoModificado.indexOf(letraMayusculas) != -1) {
            posicion[contador] =
              nombreSecretoModificado.indexOf(letraMayusculas);
            nombreSecretoModificado = nombreSecretoModificado.substring(
              nombreSecretoModificado.indexOf(letraMayusculas) +
                letraMayusculas.length,
              nombreSecretoModificado.length
            );

            // Calculamos la posición total.
            if (contador > 1) {
              posicionTotal = posicionTotal + posicion[contador] + 1;
            } else {
              posicionTotal = posicionTotal + posicion[contador];
            }

            // Preparamos la palabra para que sea mostrara en modal de solución directa.
            this.palabra[posicionTotal] = letraMayusculas;

            // Sumamos puntos
            if (this.controlLetras.indexOf(letraMayusculas) == -1) {
              this.puntos = this.puntos + 10;

              // Hacemos uso de Toast Controller para lanzar mensajes flash.
              let toast = this.toastCtrl.create({
                message:
                  'Genial, la letra ' +
                  letraMayusculas +
                  ' está en la palabra secreta.',
                duration: this.durationMessages,
                cssClass: 'toast-success',
                position: 'top',
              });
              (await toast).present();
            }

            contador++;

            // Si ya no quedan huecos, mostramos el mensaje para el ganador.
            if (this.palabra.indexOf('_') == -1) {
              // Sumamos puntos
              if (this.controlLetras.indexOf(letraMayusculas) == -1) {
                this.puntos = this.puntos + 50;
              }

              // Damos el juego por finalizado, el jugador gana.
              this.finDelJuego('gana');
            }
          }
        } else {
          // Restamos una vida.
          this.nuevoFallo();
          // Actualizamos la imagen
          this.nuevaImagen(this.imagen);

          // Comprobamos si nos queda alguna vida.
          if (this.vidas > 0) {
            // Restamos puntos siempre y cuando no sean 0.
            if (this.puntos > 0) {
              if (this.controlLetras.indexOf(letraMayusculas) == -1) {
                this.puntos = this.puntos - 2;
              }
            }

            // Mostramos un mensaje indicando el fallo.
            let toast = this.toastCtrl.create({
              message:
                'Fallo, la letra ' +
                letraMayusculas +
                ' no está en la palabra secreta. Recuerda que te quedan ' +
                this.vidas +
                ' vidas.',
              duration: this.durationMessages,
              cssClass: 'toast-danger',
              position: 'top',
            });
            (await toast).present();
          } else {
            // Damos el juego por finalizado, el jugador pierde.
            this.finDelJuego('pierde');
          }
        }

        // Array de letras utilizadas para mostrar al jugador.
        if (this.letras_utilizadas == '') {
          this.letras_utilizadas += letraMayusculas;
        } else {
          this.letras_utilizadas += ' - ' + letraMayusculas;
        }

        // Añadimos al array de letras la nueva letra seleccionada.
        this.controlLetras.push(letraMayusculas);
      } else {
        // En caso de que la letra ya hubiera sido seleccionada, mostramos un mensaje.
        let toast = this.toastCtrl.create({
          message:
            'La letra ' +
            letraMayusculas +
            ' fue seleccionada anteriormente. Por favor, seleccione una letra diferente.',
          duration: this.durationMessages,
          cssClass: 'toast-warning',
          position: 'top',
        });
        (await toast).present();
      }
    }
  }

  public muestraHuecosPalabra() {
    let totalHuecos = this.nombreSecreto.length;

    // Declaramos la variable huecos como nuevo array.
    let huecos = new Array();
    for (let i = 0; i < totalHuecos; i++) {
      //Asignamos tantos huecos como letras tenga la palabra.
      huecos.push('_');
    }

    // Para empezar formamos la variable palabra tan solo con los huecos, ya que en este momento aún no se ha seleccionado ninguna letra.
    this.palabra = huecos;
    return this.palabra;
  }

  // Método que genera una palabra aleatoria comprendida en el array nombres.
  public palabraAleatoria(primer: number, ultimo: number) {
    let numberOfName = Math.round(Math.random() * (ultimo - primer) + primer);
    return this.nombres[numberOfName];
  }

  public nuevoFallo() {
    this.vidas = this.vidas - 1;
    return this.vidas;
  }

  public nuevaImagen(imagen: number) {
    this.imagen = imagen + 1;
    return this.imagen;
  }

  public confirmarResolver() {
    


    this.showPrompt()
    
    
  }

  public async showPrompt() {
      const prompt = this.alertController.create({
        //title: 'Solución directa',
        message: '¿Está seguro de resolver la palabra secreta directamente?',
        inputs: [
          {
            name: 'palabraSolucion',
            id: 'palabraSolucion',
            placeholder: this.palabra,
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: (data) => {
              // Se cierra ventana.
            },
          },
          {
            text: 'Resolver',
            handler: (data) => {
              // Llamamos a método que compara la palabra secreta con la insertada mediante teclado.
              // var solucion = this.palabra.toString();
              // var solucion = solucion.replace(/,/g, '');
              var solucion = (
                document.getElementById('palabraSolucion') as HTMLInputElement
              ).value;
              this.resolver(solucion);
             
            },
            
          },
          
        ],
      });
      (await prompt).present();    
  }




  public async showConfirm(accion: string) {
    // Resolver
    if (accion == 'resolver') {
      const confirm = this.alertController.create({
        //title: 'Solución directa',
        message: '¿Está seguro de resolver la palabra secreta directamente?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              //
            },
          },
          {
            text: 'Confirmar',
            handler: () => {
              //
            },
          },
        ],
      });
      (await confirm).present();
    }
  }

  public async resolver(solucion: string) {
    // Comprobamos la solución directa.

    if (this.nombreSecreto == solucion.toUpperCase()) {
      var totalOcultas = 0;
      // Recorremos el array para detectar huecos sin transformar a letras.
      for (var i = 0; i < this.palabra.length; i++) {
        if (this.palabra[i] == '_') {
          totalOcultas = totalOcultas + 1;
        }
      }

      // ACIERTO :: Sumamos +50 y + 20 por cada hueco sin desvelar.
      this.puntos = this.puntos + 50 + 20 * totalOcultas;

      this.finDelJuego('gana');

      // Colocamos la palabra secreta en el
    } else {
      // ERROR :: RESTAMOS 50.
      this.puntos = this.puntos - 4;

      if(this.puntos<0){
        this.puntos=0
        this.nuevaImagen(this.imagen);
      }

      this.vidas=this.vidas-1
        this.exitTimer();
        let toast = this.toastCtrl.create({
          message:
            'Lo sentimos!, La palabra ' +
            solucion +
            ' no es la palabra secreta. Su error le resta 4 puntos.',
          duration: this.durationMessages,
          cssClass: 'toast-danger',
          position: 'top',
        });
        (await toast).present();
      if(this.vidas==0)this.finDelJuego('pierde');
    }
    
  }

  public async finDelJuego(valor: string) {
    
    // Perdedor
    if (valor == 'pierde') {
      this.ganador = 0;
      //final del tiempo
      this.exitTimer();
      
      // Mostramos el mensaje como que el juego ha terminado
      let toast = this.toastCtrl.create({
        message:
          'Perdiste!, Inténtalo de nuevo. Has conseguido un total de ' +
          this.puntos +
          ' puntos. La palabra secreta es ' +
          this.nombreSecreto,
        duration: this.durationMessages,
        cssClass: 'toast-danger',
        position: 'top',
      });
      (await toast).present();
      this.gameFinished();
    }

    // Ganador
    if (valor == 'gana') {
      this.ganador = 1;
      //final del tiempo
      this.exitTimer();

      let toast = this.toastCtrl.create({
        message:
          'Enhorabuena!, Has acertado la palabra secreta. Has conseguido un total de ' +
          this.puntos +
          ' puntos.',
        duration: this.durationMessages,
        cssClass: 'toast-success',
        position: 'top',
      });
      (await toast).present();
      this.gameFinished();
    }
    //this.gameFinished();
    
  }

  public reiniciaJuego() {
    this.letra = '';
    this.palabra = '';
    this.vidas = 6;
    this.mensaje = '';
    this.ganador = 0;
    this.puntos = 0;
    this.nombreSecreto = this.palabraAleatoria(0, this.nombres.length - 1);
    this.muestraHuecos = this.muestraHuecosPalabra();
    this.imagen = 1;
    this.letras_utilizadas = '';
    this.nombresecretomostrar = '';
    this.controlLetras = new Array();
    this.startGame();
  }


  async gameFinished() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Finished!',
      message: '<ion-icon class="smiley" name="happy-outline"></ion-icon><br><div class="score">Score : ' + this.puntos+'</div>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.navCtrl.navigateForward('/usuario-menu/usuario-menugames');
          }
        }, {
          text: 'Play Again',
          handler: () => {
            this.startGame();
            this.reiniciaJuego()
            this.puntos=0
            this.vidas=6
          }
        }
      ]
    });
    await alert.present();
  }


 

}
