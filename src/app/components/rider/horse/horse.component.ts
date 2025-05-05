import { Component, Input, OnInit } from '@angular/core';
import { Horse, Score, Photo, Competition, EventSeries } from 'src/app/models';
import { DbService } from 'src/app/services';

@Component({
  selector: 'sn-rider-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.scss']
})

export class RiderHorseComponent implements OnInit {
  @Input() horsefei: string;
  @Input() ridername: string;
  @Input() riderfei: string;
  public horse: Horse;
  public photoDisplay: string;
  public scoresShow: string[];
  public showNotes = true;

  constructor(private dbService: DbService) {
  }

  ngOnInit() {
    const comps: Competition[] = this.dbService.Competitions;
    const eventserieses: EventSeries[] = this.dbService.EventSerieses;

    this.horse = this.dbService.GetHorse(this.horsefei);

    const photo: Photo = this.dbService.GetPhoto(this.horsefei);
    this.photoDisplay = '';
    if (photo && photo.Photo) {
        this.photoDisplay = photo.Photo;
    }

    const scores: Score[] = this.horse.scores.filter(s => s.Rider.Fei === this.riderfei && s.Result.p !== 'PEND').sort((a, b) => { if (a.Competition.Fei > b.Competition.Fei) { return -1; } else if (b.Competition.Fei > a.Competition.Fei) { return 1; } return 0; });

    this.scoresShow = scores.map(
      s => eventserieses.find(
        e => e.Id === comps.find(
          c => c.Fei === s.Competition.Fei
        ).EventSeries
      ).Name + '\xa0' + comps.find(
        c => c.Fei === s.Competition.Fei
      ).Year + ':' + (
        s.Dnf
          ? s.DnfDescription
          : s.Result.p));
  }

  openDataPages(): void {
    const pattern = /([^(]*) \(?(.*)?\)?/;
    let horseSearchableName = this.horse.Name;
    if (this.horse.Name.indexOf("(") > -1) {
      horseSearchableName = horseSearchableName.replace(pattern, "$1");
    }

    window.open('https://data.fei.org/Horse/Performance.aspx?horsefeiid=' + this.horse.Fei);
    window.open('https://www.google.co.uk/search?btnG=Search+Images&tbm=isch&q=' + '"' + horseSearchableName + '"' + '+' + this.ridername);
    window.open('https://www.google.co.uk/search?q=' + '"' + horseSearchableName + '"' + '+' + this.ridername);
    window.open('https://www.google.co.uk/search?q=' + this.ridername + '+' + 'eventing');
    window.open('https://www.google.co.uk/search?q=' + '"' + horseSearchableName + '"' + '+' + 'British+Eventing');
  }
}
