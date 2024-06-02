import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.css'
})
export class ErrorAlertComponent {
  message: string = '';
  closeAlert!:Function;

}
