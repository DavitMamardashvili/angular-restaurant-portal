import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-area',
  templateUrl: './filter-area.component.html',
  styleUrl: './filter-area.component.css'
})
export class FilterAreaComponent {
  // @Input() objectForFilterArea: any;
   @Output() filterData: EventEmitter<string> = new EventEmitter<string>

  activeDiv = [false, true, false]

  onFilterDataCliick(activIndex: number , filterBy:string) {
    this.activeDiv.forEach((_, index) => this.activeDiv[index] = false);
    this.activeDiv[activIndex] = true;
    this.filterData.emit(filterBy);

  }




}


