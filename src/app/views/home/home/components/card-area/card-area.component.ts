import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-area',
  templateUrl: './card-area.component.html',
  styleUrl: './card-area.component.css'
})
export class CardAreaComponent {
  @Input() cardsObj: any[] = [];

  constructor(){
    console.log(this.cardsObj)
  }

}
