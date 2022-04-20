import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Datablock, Rider, Horse, Score, Competition, EventSeries } from 'src/app/models';
import { Photo } from '../models/photo';

@Injectable({
    providedIn: 'root'
})
export class DbService {
    private datablock: Datablock;

    constructor(private http: HttpClient) {
        // just load whatever's in datablock.json
        this.datablock = new Datablock(http, '', '', '', '');

        // load whatever's in datablock.json,
        // then add new or updated show entries from an input file
        // and print it out so it can be saved as the new datablock.json
        // this.datablock = new Datablock(http, 'assets/input.txt', '2022_Badminton', '5LBn', RegexPattern.Eventing);
    }

    get Riders(): Rider[] {
        return this.datablock.riders;
    }

    get Horses(): Horse[] {
        return this.datablock.horses;
    }

    get Photos(): Photo[] {
        return this.datablock.photos;
    }

    get Scores(): Score[] {
        return this.datablock.scores;
    }

    get Competitions(): Competition[] {
        return this.datablock.competitions;
    }

    get EventSerieses(): EventSeries[] {
        return this.datablock.eventseries;
    }


    public GetPhoto(fei: string): Photo {
        return this.Photos.find(p => p.Fei === fei);
    }

    public GetHorse(fei: string): Horse {
        return this.Horses.find(h => h.Fei === fei);
    }

    public GetRider(fei: string): Rider {
        return this.Riders.find(r => r.Fei === fei);
    }
}
