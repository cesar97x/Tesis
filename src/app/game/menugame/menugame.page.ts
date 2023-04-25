import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-menugame',
  templateUrl: './menugame.page.html',
  styleUrls: ['./menugame.page.scss'],
})
export class MenugamePage implements OnInit {

  constructor(
    private auth: Auth
    ) { }

  ngOnInit() {
  }

  rating: number = 0;

  rate(index: number) {
    this.rating = index;
  }

  submitRating() {
    console.log('Calificación:', this.rating);
  }

}
