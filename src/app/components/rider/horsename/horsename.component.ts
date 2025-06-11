import { Component, Input } from '@angular/core';

@Component({
  selector: 'sn-rider-horsename',
  templateUrl: './horsename.component.html',
    styleUrls: ['./horsename.component.scss']
})
export class RiderHorsenameComponent {
  @Input() name: string;

  constructor() {
  }
}
