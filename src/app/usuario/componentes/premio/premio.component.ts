import { Component, Input, OnInit } from '@angular/core';
import { PremioI } from 'src/app/models/premio';

@Component({
  selector: 'app-premio',
  templateUrl: './premio.component.html',
  styleUrls: ['./premio.component.scss'],
})
export class PremioComponent implements OnInit {


  @Input() premio: PremioI;
  constructor() { }

  ngOnInit(
    
  ) {
    console.log('elpremio es ',this.premio)
  }

}
