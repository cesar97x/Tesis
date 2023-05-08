import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
import { annotate } from 'rough-notation';
import { Question } from './models/question';
import { Observable, timer } from 'rxjs';
import { Answer } from './models/answer';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GameI, usuarioI } from 'src/app/models/game';
import { PuntajeI } from 'src/app/models/Puntaje';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mathgame',
  templateUrl: './mathgame.page.html',
  styleUrls: ['./mathgame.page.scss'],
})
export class MathgamePage {

  path:string='Games/'

  questions: Question[];

  preguntasmaximas: number=0;
  min: number;
  max: number;
  score: number;
  date: number;
  timer: any;
  timerObs: any;
  vidas:number=6;
  game:GameI;

  limite:number=1000;

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
  nowpuntaje: PuntajeI = {
		id: null,
		cliente: null,
		puntajetotal: null
	}
  uid = '';
  puntaje: PuntajeI;
  namegog=null;
  
  constructor(public alertController: AlertController,
    private authService: AuthService,
     public navCtrl:NavController,
     private database:FirestoreService
    ) {
    this.startGame();
  }
  async ngOnInit() {
		//this.restartGame();
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

  startGame() {
    this.exitTimer();
    this.min = 1;
    this.max = 9;
    this.score = 0;
    this.timer = { current: 0, max:this.limite };
    this.questions = [];
    this.addQuestion();
    this.preguntasmaximas=0;

    const everySecond: Observable<number> = timer(0, 1000);
    this.timerObs = everySecond.subscribe((seconds) => {
      this.timer.current++;
      this.convertirSegundos(this.timer.current)
      if (this.timer.current === this.limite) {
        this.exitTimer();
        this.gameFinished();
      }
    });

  }


  //Metodo de comvertir a h-M-s
  texto:String="";
  public convertirSegundos(segundos: number) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
  this.texto=horas+":"+minutos+":"+segundosRestantes
    return { horas, minutos, segundos: segundosRestantes };
  }

 
  addQuestion() {
    this.date = Date.now();
    this.preguntasmaximas+=1;
    console.log('>>>>>>>>>>>>>>',this.preguntasmaximas)
    let ans1, ans2;
    const a = Math.floor(Math.random() * this.max) + this.min;
    const b = Math.floor(Math.random() * this.max) + this.min;

    const ope = Math.floor(Math.random() * 3) + 1;

    let q: Question = { label: '', answers: [] };
    
    console.log("la ope:"+ope)

    if(ope==1){
      q.label = a + ' + ' + b;
    
    }else if(ope==2){
      if(a>=b){
        q.label = a + ' - ' + b;
      }else{
        q.label = b + ' - ' + a;
      }
    }else if(ope==3){
      q.label = a + ' * ' + b;
    }
    /*
    else if(ope==4){
      if(b>0){
        q.label = a + ' / ' + b;
      }
    }
*/
    //q.label = a + ' * ' + b;
    const result = eval(q.label);
    q.answers.push({ value: result, isCorrect: true });
    //if little value => +/-1
    if (result < 13) {
      ans1 = ans2 = 1;
    } else {
      ans1 = Math.floor(Math.random() * this.max / 3) + 1;
      ans2 = ans1 + Math.floor(Math.random() * this.max / 3) + 1;
      if (Math.round(Math.random()) % 2 === 0) {
        ans1 = -ans1;
      }
      if (Math.round(Math.random()) % 2 === 0) {
        ans2 = -ans2;
      }
    }
    q.answers.push({ value: result + ans1, isCorrect: false });
    q.answers.push({ value: result - ans2, isCorrect: false });
    this.shuffle(q.answers);
    this.questions.unshift(q);

    if(this.preguntasmaximas==5 && this.score>0){


      console.log("*************Gano")
      this.exitTimer();
      this.gameFinished();
      
      //*********************************************** */
      this.game ={
        
        puntos:this.score,
        vidas:this.vidas,
        tiempo:String(this.texto),
        estado:String("gano")
      }
      this.puntaje = {
				id: this.uid,
				cliente: this.usuarioperfil,
				puntajetotal: this.score

			}
      
      
      this.database.addDocumento(this.game,this.path)
			this.NowcreateandUpdate(this.puntaje)
      
    }
  }

  shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
  }

  clickAnswer(idxQ, idxA, answer: Answer, question: Question) {
    let annotation, annotationCorrect;
    if (!question.isDone) {
      const e = document.getElementById('id' + idxQ + idxA);
      if (answer.isCorrect) {
        annotation = annotate(e, { type: 'circle', color: '#0D47A1' });
        //let add = Math.ceil(answer.value / 10) * (10 - Math.round((Date.now() - this.date) / 1000));
        let add= 5
        if (add > 0) {
          this.score += add;
          
        }
      } else {
        let add= 2
        this.score -= add;
        if(this.score<0){
          this.score=0
        }

        
        this.vidas=this.vidas-1
        console.log('*******',this.preguntasmaximas)
        if(this.vidas==0&&this.score==0 ||this,this.preguntasmaximas==5){
          
          this.exitTimer();
          this.gameFinished();
          

          this.game ={
            
            puntos:this.score,
            vidas:0,
            tiempo:String(this.texto),
            estado:String("perdio"),
            
          }
          this.puntaje = {
            id: this.uid,
            cliente: this.usuarioperfil,
            puntajetotal: this.score
    
          }
          
          this.database.addDocumento(this.game,this.path)
          this.NowcreateandUpdate(this.puntaje)
        }
        
        

        annotation = annotate(e, { type: 'crossed-off', color: '#F57F17' });
        for (let a in question.answers) {
          if (question.answers[a].isCorrect) {
            const f = document.getElementById('id' + idxQ + a);
            annotationCorrect = annotate(f, { type: 'underline', color: '#1B5E1F' });
            annotationCorrect.show();
            break;
          }
        }
      }
      annotation.show();
      //increase diff
      this.max += 2;
      this.min += 1;
      
      
      setTimeout(() => {
        

        this.addQuestion();
        
      
      }, 1200);
    }
    question.isDone = true;

  }

  exitTimer() {
    this.timerObs?.unsubscribe();
  }


  retornar(){

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
            this.score=0
            this.vidas=6
          }
        }
      ]
    });
    await alert.present();
  }

  getUserInfo(uid: string) {
		console.log('uid-------------', uid)
		const path = 'users/'
		const info: any = this.database.getDocUsu<usuarioI>(path, this.uid).subscribe(res => {
			console.log('uressssss --->', res)
			this.usuarioperfil = res;
      this.usuarioperfil = res;
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
        //usuarioNE.nombres=this.namegog
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
