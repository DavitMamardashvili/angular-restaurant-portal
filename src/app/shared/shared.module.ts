import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './components/message/error-message/error-message.component';
import { ErrorAlertComponent } from './components/alerts/error-alert/error-alert.component';
import { SuccessAlertComponent } from './components/alerts/success-alert/success-alert.component';



@NgModule({
  declarations: [
    ErrorMessageComponent,
    ErrorAlertComponent,
    SuccessAlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ErrorMessageComponent
  ]
})
export class SharedModule { }
