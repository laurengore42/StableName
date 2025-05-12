import { Component, Input } from '@angular/core';

@Component({
  selector: 'sn-horse-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss']
})

export class HorseDrawingComponent {
  @Input() colour: string;
  @Input() nearfore: string;
  @Input() offfore: string;
  @Input() nearhind: string;
  @Input() offhind: string;
  
  constructor() {
  }
}
