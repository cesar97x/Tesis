import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { GameI, usuarioI } from 'src/app/models/game';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PuntajeI } from 'src/app/models/Puntaje';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-fruitsgame',
	templateUrl: './fruitsgame.page.html',
	styleUrls: ['./fruitsgame.page.scss'],
})
export class FruitsgamePage implements OnInit {
	path: string = 'Games/'
	game: GameI;
	puntaje: PuntajeI;

	limite: number = 1000;
	min: number = 0;
	max: number = 0;

	timer: any;
	timerObs: any;
	public puntajetotal: number = 0;

	public score = 0;
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



	//********************* */
	usuarioperfil: usuarioI = {
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
	uid = '';
	puntajes: PuntajeI[] = [];

	nowpuntaje: PuntajeI = {
		id: null,
		cliente: null,
		puntajetotal: null
	}

	namegog=null;


	constructor(
		private authService: AuthService,
		private database: FirestoreService,
		public alertController: AlertController, public navCtrl: NavController,
	) {
		this.startGame();
	}

	async ngOnInit() {
		this.restartGame();
		//****para recuperar un usaurio o el q iniciosesion */
		this.uid = await this.authService.getUid();
		this.namegog = await this.authService.getname();
		console.log('usuario en perfil ontenido--->==>', this.uid)
		this.getUserInfo(this.uid);
		this.Nowrecuperapuntosusuarios(this.uid)
		//this.obtenerPuntajebyUsuario(this.uid);
		//this.NowcreateandUpdate()
		//this.obtenerPuntajebyUsuarioOf(this.uid)
		//this.obtenerPuntajebyUsuario();

		//****para recuperar un usaurio o el q iniciosesion */
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
					this.score += 7;
					this.cardsArray.splice(this.selectOldPosix, 1, { pos: this.selectOldPosix, val: -1 });
					this.cardsArray.splice(i, 1, { pos: i, val: -1 });
					this.resetSelects();
					this.winCon()
				}
				// de lo contrario tome una vida y reinicie
				else {
					this.debugText = "!las tarjetas no coinciden!";
					this.userLife -= 1;
					this.score -= 2
					if (this.score <= 0) this.score = 0;
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
			if (this.cardsArray[i].val != -1) {
				winCheck = true;
			}

		// si el control es falso , el jugador a ganado el juego
		if (winCheck == false) {
			this.gameState = 'win';
			this.gameFinished()
			this.game = {

				puntos: this.score,
				vidas: this.userLife,
				tiempo: String(this.texto),
				estado: String("gano")
			}


			this.database.addDocumento(this.game, this.path)
			//***************************************para crear el puntaje global
			console.log('se va guardar usuario-***>', this.uid)
			this.puntaje = {
				id: this.uid,
				cliente: this.usuarioperfil,
				puntajetotal: this.score

			}
			//this.addpuntaje(this.puntaje);
			//var resultado:string='';
			//resultado=this.obtenerPuntajebyUsuario()
			//this.obtenerPuntajebyUsuario()
			//console.log("resultado de ganar y buscar si hay puntaje-->",this.puntajes)
			//this.actualizarpuntajeocrear(this.puntaje);
			this.NowcreateandUpdate(this.puntaje)

		}

		this.exitTimer()

	}

	// condicion de perdida
	loseCon() {
		this.gameState = 'lose';
		if (this.userLife == 0) {
			this.gameFinished()
			this.exitTimer()
			this.game = {

				puntos: this.score,
				vidas: this.userLife,
				tiempo: String(this.texto),
				estado: String("pierde")
			}


			this.database.addDocumento(this.game, this.path)
			this.puntaje = {
				id: this.uid,
				cliente: this.usuarioperfil,
				puntajetotal: this.score

			}
			//this.addpuntaje(this.puntaje);
			//var resultado:string='';
			//resultado=this.obtenerPuntajebyUsuario()
			//this.obtenerPuntajebyUsuario()
			//console.log("resultado de ganar y buscar si hay puntaje-->",this.puntajes)
			//prueba cuando pierod comentado primero para guardar enel miso cliente

			//this.actualizarpuntajeocrear(this.puntaje);
			//const path='users/'+this.uid+'/puntajeusuario'
			//this.database.addDocumento(this.puntaje,path)
			//*********this.database.createpuntaje(this.puntaje,this.uid)
			//this.Nowrecuperapuntosusuarios()
			this.NowcreateandUpdate(this.puntaje)
		}
	}

	// Function funcion para resetear las caras deleccionadas
	resetSelects() {
		this.selectCard1pos = -1;	// Selected card #1 position
		this.selectCard1val = -1;	// Selected card #1 value
		this.selectCard2pos = -1;	// Selected card #2 position
		this.selectCard2val = -1;	// Selected card #2 value
	}

	texto: String = "";
	public convertirSegundos(segundos: number) {
		const horas = Math.floor(segundos / 3600);
		const minutos = Math.floor((segundos % 3600) / 60);
		const segundosRestantes = segundos % 60;
		this.texto = horas + ":" + minutos + ":" + segundosRestantes
		return { horas, minutos, segundos: segundosRestantes };
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
			message: '<ion-icon class="smiley" name="happy-outline"></ion-icon><br><div class="score">Score : ' + this.score + '</div>',
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
						this.score = 0
						this.userLife = 6
					}
				}
			]
		});
		await alert.present();
	}

	addpuntaje(puntaje: PuntajeI) {
		const path: string = 'Puntaje/'
		this.database.addDocumento(puntaje, path);
	}

	

	

		


	getUserInfo(uid: string) {
		console.log('uid-------------', uid)
		const path = 'users/'
		const info: any = this.database.getDocUsu<usuarioI>(path, this.uid).subscribe(res => {
			console.log('uressssss --->', res)
			this.usuarioperfil = res;
			//esto cree para cerar a usuario si no existe cuando logue con google
			if(res){
				console.log("si existe el usuario en  users")
			}else{
				console.log("No existe el usuario en  users")
				var usuarioNE: usuarioI = {
					nombres: this.namegog,
					apellido: null,
					email: null,
					fechaNacimiento: null,
					uid: null,
					perfil: null,
					direccion: null,
					genero: null,
					edad: null
				}
				this.database.createususuariogoogle(usuarioNE,this.uid)
				console.log("creadooooooooooo")
			}
		});
		console.log('usuario de inicio de sesion --->', info)
	}


	NowcreateandUpdate(puntos: PuntajeI) {

		//console.log('uid-------------',uid)
		const path = 'PuntajeActual/'
		//const id='asddasfdasf'

		if (this.nowpuntaje) {
			console.log('------> actulizando')
			console.log('------> score ganado',puntos.puntajetotal)
			console.log('------> score almacenado',this.nowpuntaje.puntajetotal)

			const sumatotal = this.nowpuntaje.puntajetotal += puntos.puntajetotal;
			console.log('------> sumatotal',sumatotal)
			const puntajenew: PuntajeI = {
				id: puntos.id,
				cliente: puntos.cliente,
				puntajetotal: sumatotal

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

Nowrecuperapuntosusuarios(uid:string){
	//console.log('uid-------------',uid)
	const path = 'PuntajeActual/'
	//const id = 'asddasfdasf'
	const info: any = this.database.getDocUsu<PuntajeI>(path,uid).subscribe(res => {
		this.nowpuntaje = res
		console.log("puntaje de usuario@@@@@", this.nowpuntaje)
	});
	//console.log('puntaje usuario --->',info)

}



}
