import { Component, Input, OnInit } from '@angular/core';
import { Horse, Photo, EventSeries, Competition, Score } from 'src/app/models';

@Component({
  selector: 'sn-scorelist-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.scss']
})

export class ScorelistHorseComponent implements OnInit {
  @Input() horse: Horse;
  @Input() photo: Photo;
  @Input() position: string;
  @Input() ridername: string;
  @Input() outcome: string;
  public dnf: boolean;
  public photoDisplay: string;

  constructor() { }

  ngOnInit() {
    this.dnf = this.position === 'EL' || this.position === 'WD' || this.position === 'RET' || this.position === 'DSQ';

    this.photoDisplay = '';
    if (this.photo && this.photo.Photo) {
        this.photoDisplay = this.photo.Photo;
    }
  }

  openDataPages(): void {
    window.open('https://data.fei.org/Horse/Performance.aspx?horsefeiid=' + this.horse.Fei);
    window.open('https://www.google.co.uk/search?btnG=Search+Images&tbm=isch&q=' + '"' + this.horse.Name + '"' + '+' + this.ridername);
    window.open('https://www.google.co.uk/search?q=' + '"' + this.horse.Name + '"' + '+' + this.ridername);
    window.open('https://www.google.co.uk/search?q=' + this.ridername);
    window.open('https://www.google.co.uk/search?q=' + '"' + this.horse.Name + '"' + '+' + 'British+Eventing');
  }
}
