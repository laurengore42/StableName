import { Component, Input } from '@angular/core';
import { Horse } from 'src/app/models';

@Component({
  selector: 'sn-horse-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})

export class HorseDescriptionComponent {
  @Input() horse: Horse;
  
  constructor() {
  }
}
