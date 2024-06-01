import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicHostDirective } from './directives/dynamic-host.directive';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DynamicHostDirective
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    DynamicHostDirective
  ]
})
export class CoreModule { }
