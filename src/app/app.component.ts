import { Component } from '@angular/core';
import { FirestoreService } from './services/firestore.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  //no estaba la injeccion del auth 
    constructor(private firebase:FirestoreService) {}
}
