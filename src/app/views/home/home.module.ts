import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CardAreaComponent } from './home/components/card-area/card-area.component';
import { FilterAreaComponent } from './home/components/filter-area/filter-area.component';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    HomeComponent,
    CardAreaComponent,
    FilterAreaComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports:[
    HomeRoutingModule
  ]
})
export class HomeModule { }
