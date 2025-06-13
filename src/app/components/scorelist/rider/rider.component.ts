import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Horse, Rider } from 'src/app/models';
import { DbService } from 'src/app/services';

@Component({
  selector: 'sn-scorelist-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.scss']
})
export class ScorelistRiderComponent implements OnInit {
  @Input() draw: number;
  @Input() sum: string;
  @Input() position: string;
  @Input() riderfei: string;
  @Input() horsefei: string;
  @Input() isStatic: boolean;
  @Input() isShown: boolean;
  @Output() showHorse = new EventEmitter<string>();
  public dnf: boolean;
  public rider: Rider;
  public horse: Horse;

  constructor(private dbService: DbService) {
  }

  ngOnInit() {
    this.dnf = this.position === 'EL' || this.position === 'WD' || this.position === 'RET' || this.position === 'DSQ' || this.position === 'SUBST';

    this.rider = this.dbService.GetRider(this.riderfei);
    this.horse = this.dbService.GetHorse(this.horsefei);
  }

  showMe() {
    this.showHorse.emit(this.isShown ? "" : this.horsefei);
  }
}
