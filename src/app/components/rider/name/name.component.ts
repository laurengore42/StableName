import { Component, Input } from '@angular/core';

@Component({
  selector: 'sn-rider-name',
  templateUrl: './name.component.html',
    styleUrls: ['./name.component.scss']
})
export class RiderNameComponent {
  @Input() draw: number;
  @Input() sum: string;
  @Input() name: string;
  @Input() dnf: boolean;

  constructor() {
  }
}
