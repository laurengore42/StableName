import { Component, Input, OnInit } from '@angular/core';
import { Rider } from 'src/app/models';
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
  public dnf: boolean;
  public rider: Rider;

  constructor(private dbService: DbService) {
  }

  ngOnInit() {
    this.dnf = this.position === 'EL' || this.position === 'WD' || this.position === 'RET' || this.position === 'DSQ' || this.position === 'SUBST';

    this.rider = this.dbService.GetRider(this.riderfei);
  }
}
