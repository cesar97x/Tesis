import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-usuario-menu',
  templateUrl: './us-menu.page.html',
  styleUrls: ['./us-menu.page.scss'],
})
export class UsuarioMenuPage implements OnInit {

  constructor(private menu: MenuController,
              private router: Router) { }

  ngOnInit(): void {
      
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }


}
