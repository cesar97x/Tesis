import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

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
