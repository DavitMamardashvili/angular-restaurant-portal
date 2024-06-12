import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../core/firebase/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  cardsObj: any;

  constructor(private firestoreService: FirestoreService) { }


  ngOnInit(): void {
    this.firestoreService.read("/pitca").subscribe(response => this.cardsObj = response)
  }

  getFlterData(filterBy: string) {
    this.firestoreService.read(`/${filterBy}`).subscribe(response => this.cardsObj = response)
  }
}
