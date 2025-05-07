import { Component, Input, OnInit } from '@angular/core';
import { Horse, Photo } from 'src/app/models';
import { DbService } from 'src/app/services';

@Component({
  selector: 'sn-static-scorelist-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.scss']
})

export class StaticScorelistHorseComponent implements OnInit {
  @Input() horsefei: string;
  @Input() position: string;
  @Input() ridername: string;
  @Input() outcome: string;
  public dnf: boolean;
  public horse: Horse;
  public photoDisplay: string;

  constructor(private dbService: DbService) {
  }

  ngOnInit() {
    this.dnf = this.position === 'EL' || this.position === 'WD' || this.position === 'RET' || this.position === 'DSQ' || this.position === 'SUBST';

    this.horse = this.dbService.GetHorse(this.horsefei);

    const photo: Photo = this.dbService.GetPhoto(this.horsefei);
    this.photoDisplay = '';
    if (photo && photo.Photo) {
        this.photoDisplay = photo.Photo;
    }
  }
}
