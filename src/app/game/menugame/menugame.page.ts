import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menugame',
  templateUrl: './menugame.page.html',
  styleUrls: ['./menugame.page.scss'],
})
export class MenugamePage implements OnInit {

  constructor() { }

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
