import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-bienvenida',
  templateUrl: './us-bienvenida.page.html',
  styleUrls: ['./us-bienvenida.page.scss'],
})
export class UsuarioBienvenidaPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor() { }

  ngOnInit() {
  }

}
