import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
import { annotate } from 'rough-notation';
import { Question } from './models/question';
import { Observable, timer } from 'rxjs';
import { Answer } from './models/answer';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GameI } from 'src/app/models/game';

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

  constructor(public alertController: AlertController,
     public navCtrl:NavController,
     private database:FirestoreService
    ) {
    this.startGame();
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
        
        puntos:String(this.score),
        vidas:String(this.vidas),
        tiempo:String(this.texto),
        estado:String("gano")
      }
      
      
      this.database.addDocumento(this.game,this.path)

      
      
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
            
            puntos:String(this.score),
            vidas:'0',
            tiempo:String(this.texto),
            estado:String("perdio"),
            
          }
          
          
          this.database.addDocumento(this.game,this.path)
          
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

}
