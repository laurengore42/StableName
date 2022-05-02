import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Datablock } from './models';
import { RegexPattern } from './enums';

@Component({
  selector: 'sn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public title = 'StableName';
  public compfei: string;
  public datablock: Datablock;

  constructor(private http: HttpClient) {
    // just load whatever's in datablock.json
    this.datablock = new Datablock(http, '', '', '', '');

    // load whatever's in datablock.json,
    // then add new or updated show entries from an input file
    // and print it out so it can be saved as the new datablock.json
    // this.datablock = new Datablock(http, 'assets/input.txt', '2019_CI_0065_C_S_01_01', '5LBy', RegexPattern.Eventing);

    // show entries for a single event
    this.compfei = '2022_Badminton';
  }
}
