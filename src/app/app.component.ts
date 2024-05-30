import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirestoreService } from './core/firebase/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'restaurant-portal';

  constructor(private f :FirestoreService){

  }
  X(form:NgForm){
    this.f.create('example' , form.value)
  }
}
