import { Component, Input } from '@angular/core';

@Component({
  selector: 'sn-rider-details',
  templateUrl: './details.component.html'
})
export class RiderDetailsComponent {
  @Input() otherName: string;
  @Input() baseDescriptor: string;
  @Input() fei: string;
  @Input() notes: string;
  @Input() horseList: string;
  @Input() dnf: boolean;

  constructor() {
  }
}
