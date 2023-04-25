import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-fruitsgame',
  templateUrl: './fruitsgame.page.html',
  styleUrls: ['./fruitsgame.page.scss'],
})
export class FruitsgamePage implements OnInit {

  limite:number=1000;
  min: number=0;
  max: number=0;
  
  timer: any;
  timerObs: any;
	
	public score=0;
	public gameState;       //estado del juego
	public startGame1;       // para comenzar el juego mostrar display 
	public countDown;       // cuenta regresiva de 3 seg
	public totalTime;       // el tiempo total del jugador para ganar
	public countTime;       // el tiempo del juego mientras se esta jugando
	public shownTime;       // para mostrar el tiempo en texto
	public interTime;       // temporizador  que comieza en 1 s
	public interCount;      // temporizador en juego 

	public cardsTotal = 8;	// total de cartas dividas por 2  (asi habra 2 combinaciones total 12)
	public cardsArray = [];	// almacenamiento de todos los pares de tarjetas
	public userLife = 6;		// cantidad de intentos del usuario
	public imageDir = '../assets/img/FruitsAll/'; //direccion de todas las imagenes 
	public images = ['banano', 'cereza', 'durazno', 'fresa',
		'kiwi', 'limon', 'mango', 'manzana'];

	public selectCard1pos = -1;	// selecionamos tarjeta #1 position
	public selectCard1val = -1;	// selecionamos tarjeta #1 value
	public selectCard2pos = -1;	// selecionamos tarjeta #2 position
	public selectCard2val = -1;	// selecionamos tarjeta #2 value
	public selectOldPosix = -1; 	// seleccionamos la vieja posicion
	public debugText = "Debug text goes here! :)"

	constructor(
		public alertController: AlertController,  public navCtrl: NavController,
	) {
		this.startGame();
	 }

	ngOnInit() {
		this.restartGame();
	}



	//funcion para completar la matriz de tarjetas con pares
	// de posicion y valor de 0 a 6  lo que significa es que para cada
	//dos posiciones vamos a querer el mismo valor 

	populateCards() {
		this.cardsArray = [];
		var x = 0;
		var y = 0;
		for (var i = 0; i < this.cardsTotal; i++) {
			// poner  la tarjeta a la matriz y asignar valor
			this.cardsArray.push({ pos: i, val: y });
			// Voltear x para asignar el mismo valor a la siguiente carta
			if (x == 0) x = 1;
			else { x = 0; y++ }
			console.log("**** this cards array")
			console.log(this.cardsArray)
		}
	}

	// Function para seleccionar las tarjetas
	selectCard(pos, val, i) {
		var actOne = false;
		//codigo para seleccionar la segunda tarjeta 
		if (this.selectCard1pos > -1 && this.selectCard2pos == -1) {
			this.selectCard2pos = pos;
			this.selectCard2val = val;
			actOne = true;
		}
		// Code to select the first card
		if (this.selectCard1pos == -1 && !actOne) {
			this.selectCard1pos = pos;
			this.selectCard1val = val;
			this.selectOldPosix = i;
		}
		//si tenemos las dos cartas seleccionadas
		// verificamos si coinciden o fallan 

		if (actOne && this.selectCard1pos > -1 && this.selectCard2pos > -1) {
			setTimeout(() => {
				// si las dos cartas coninciden , ahcer esto
				if (this.selectCard1val == this.selectCard2val) {
					this.debugText = "!Las cartas coinciden!";
					//elimnar tarjetas del arraya de tarjetas
					this.score +=7;
					this.cardsArray.splice(this.selectOldPosix, 1, { pos: this.selectOldPosix, val: -1 });
					this.cardsArray.splice(i, 1, { pos: i, val: -1 });
					this.resetSelects();
					this.winCon()
				}
				// de lo contrario tome una vida y reinicie
				else {
					this.debugText = "!las tarjetas no coinciden!";
					this.userLife -= 1;
					this.score-=2
					if (this.score <= 0) this.score=0;
					this.resetSelects();
					if (this.userLife <= 0) this.loseCon();
				}
			}, 1000);
		}
	}


	//funcion para barajar o ramdorizar el array de cartas 
	shuffle(a) {
		var j, x, i;
		for (i = a.length; i; i--) {
			j = Math.floor(Math.random() * i);
			x = a[i - 1];
			a[i - 1] = a[j];
			a[j] = x;
		}
	}

	// funcion para reiniciar el juego 
	restartGame() {
		this.gameState = 'load';
		this.startGame1 = false;
		

		this.userLife = 6;
		this.resetSelects();
		this.populateCards();
		this.shuffle(this.cardsArray);
		this.shuffle(this.images);

		this.startGame()
		
		

		//la cuencta del tiempo una ves el juego inicie 
		
	}

	// Condicion para ganar
	winCon() {
		var winCheck = false;
		//si al menos una o mas cartas no se an resuelto estan doferentes de -1 
		//entonces el usuario aun no a ganado
		for (var i = 0; i < this.cardsArray.length; i++)
			if (this.cardsArray[i].val != -1){ 
			winCheck = true;
			}
		
		// si el control es falso , el jugador a ganado el juego
		if (winCheck == false) {
		this.gameState = 'win';
		this.gameFinished()
		}
		
		this.exitTimer()
		
	}

	// condicion de perdida
	loseCon() {
		this.gameState = 'lose';
		if(this.userLife==0)this.gameFinished()
		this.exitTimer()
	}

	// Function funcion para resetear las caras deleccionadas
	resetSelects() {
		this.selectCard1pos = -1;	// Selected card #1 position
		this.selectCard1val = -1;	// Selected card #1 value
		this.selectCard2pos = -1;	// Selected card #2 position
		this.selectCard2val = -1;	// Selected card #2 value
	}

	texto:String="";
	public convertirSegundos(segundos: number) {
		const horas = Math.floor(segundos / 3600);
		const minutos = Math.floor((segundos % 3600) / 60);
		const segundosRestantes = segundos % 60;
	this.texto=horas+":"+minutos+":"+segundosRestantes
		return { horas, minutos, segundos: segundosRestantes };
	}

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


	exitTimer() {
		this.timerObs?.unsubscribe();
	  }
	


	  async gameFinished() {
		const alert = await this.alertController.create({
		  backdropDismiss: false,
		  header: 'Finished!',
		  message: '<ion-icon class="smiley" name="happy-outline"></ion-icon><br><div class="score">Score : ' + this.score+'</div>',
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
				this.restartGame()
				this.score=0
				this.userLife=6
			  }
			}
		  ]
		});
		await alert.present();
	  }

}
