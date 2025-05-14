import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

import { Competition, CompetitionDTO } from './competition';
import { EventSeries, EventSeriesDTO } from './eventseries';
import { ScoreDTO, Score, Result } from './score';
import { HorseDTO, Horse } from './horse';
import { RiderDTO, Rider } from './rider';
import { PhotoDTO, Photo } from './photo';
import { RegexPattern } from 'src/app/enums';

import scoresjson from 'src/app/data/scores.json';
import horsesjson from 'src/app/data/horses.json';
import photosjson from 'src/app/data/photos.json';
import ridersjson from 'src/app/data/riders.json';
import competitionsjson from 'src/app/data/competitions.json';
import eventseriesesjson from 'src/app/data/eventserieses.json';

class DatablockDTO {
    public c: CompetitionDTO[];
    public e: EventSeriesDTO[];
    public s: ScoreDTO[];
    public h: HorseDTO[];
    public r: RiderDTO[];
    public p: PhotoDTO[];

    constructor(db: Datablock) {
        this.c = [];
        db.competitions.forEach(co => this.c.push(co.Dto));
        this.e = [];
        db.eventseries.forEach(es => this.e.push(es.Dto));
        this.h = [];
        db.horses.forEach(hr => this.h.push(hr.Dto));
        this.r = [];
        db.riders.forEach(ri => this.r.push(ri.Dto));
        this.s = [];
        db.scores.forEach(sc => this.s.push(sc.Dto));
        this.p = [];
        db.photos.forEach(ph => this.p.push(ph.Dto));
    }
}

export class Datablock {
    public competitions: Competition[];
    public eventseries: EventSeries[];
    public scores: Score[];
    public horses: Horse[];
    public riders: Rider[];
    public photos: Photo[];

    constructor(private http: HttpClient, filename: string, competitionFei: string, competitionName: string, competitionPattern: string) {
        this.buildFromJson();

        if (filename !== '' && competitionFei !== '' && competitionName !== '' && competitionPattern !== '') {
            this.processRawTextToScores(filename, competitionFei, competitionName, competitionPattern);
        }
    }

    private buildFromJson() {
        this.scores = scoresjson.map((s: ScoreDTO) => new Score(s.c, [s.t.p, s.r, '', s.h, '', ''], s.t, s.d));
        this.horses = horsesjson.map((h: HorseDTO) => new Horse(h));
        this.riders = ridersjson.map((r: RiderDTO) => new Rider(r));
        this.competitions = competitionsjson.map((c: CompetitionDTO) => new Competition(c));
        this.eventseries = eventseriesesjson.map((e: EventSeriesDTO) => new EventSeries(e));
        this.photos = photosjson.map((p: PhotoDTO) => new Photo(p));

        this.horses.forEach(h => {
            h.scores = this.scores.filter(s => s.Horse.Fei === h.Fei);
        });
        this.riders.forEach(r => {
            r.scores = this.scores.filter(s => s.Rider.Fei === r.Fei);
        });

        this.riders.forEach(r => {
            r.horses = [];
            var previousFeiAdd = "";
            r.scores.filter(s => s.Rider.Fei === r.Fei).map(s => s.Horse?.Fei).forEach(f => {
                if (r.horses.some(h => h === undefined)) {
                    console.log('Error: horse undefined at ' + previousFeiAdd);
                }
              if (!r.horses.some(h => h !== undefined && h.Fei === f)) {
                r.horses.push(this.horses.find(h => h.Fei === f));
                previousFeiAdd = f;
              }
            });
            r.horses.sort((a, b) => { if (a.Name.toLocaleLowerCase() > b.Name.toLocaleLowerCase()) { return 1; } if (a.Name.toLocaleLowerCase() < b.Name.toLocaleLowerCase()) { return -1; } return 0; });
        });
    }

    private processRawTextToScores(filename: string, competitionFei: string, competitionEventSeries: string, competitionPattern: string): void {
        this.http.get(filename, { responseType: 'text' })
            .subscribe(data => {
                const lines: string[] = data.split(/\r?\n/);
                let currentEntry: string[] = [];
                lines.forEach((l, i) => {
                    let matches: RegExpExecArray = null;
                    if (l.trim().length > 0)
                    {
                        currentEntry.push(l);
                        const re: RegExp = new RegExp(competitionPattern, 'g');
                        matches = re.exec(l);
                    }

                    if (matches != null) {
                        // check we're not duplicating existing scores
                        let result = new Result();
                        let updatePendingScore = false;
                        let position = currentEntry[0];
                        let rider = currentEntry[1];
                        let horse = currentEntry[3];
                        let oldScore = this.scores.find(s => s.Horse.Fei === horse && s.Rider.Fei === rider && s.Competition.Fei === competitionFei);
                        if (oldScore !== undefined && oldScore.Result !== null && oldScore.Result !== undefined) {
                            if (oldScore.Result.p !== 'PEND' && oldScore.Result.p !== 'WD' && oldScore.Result.p !== 'RET' && oldScore.Result.p !== 'EL')  {
                                console.log('Duplicate non-pending score for rider ' + rider + ' horse ' + horse + '! Result position ' + oldScore.Result.p);
                                return;
                            }
                            console.log('Updating pending score for rider ' + rider + ' horse ' + horse + '...');
                            result = oldScore.Result;
                            result.p = position.trimRight();
                            updatePendingScore = true;
                        }

                        if (competitionPattern === RegexPattern.EventingOlympicJO) {
                            result.a = Number(matches[1]);
                            result.b = Number(matches[2]);
                            result.c = Number(matches[3]);
                            result.d = Number(matches[4]);
                            result.e = Number(matches[5]);
                            result.f = Number(matches[6]);
                            result.g = Number(matches[7]);
                            result.o = matches[8];
                        } else if (competitionPattern === RegexPattern.Eventing) {
                            result.a = Number(matches[1]);
                            result.b = Number(matches[2]);
                            result.c = Number(matches[3]);
                            result.d = Number(matches[4]);
                            result.e = Number(matches[5]);
                            result.o = matches[7];
                        } else if (competitionPattern === RegexPattern.Dressage) {
                            result.a = Number(matches[1]);
                            result.o = matches[1];
                        } else if (competitionPattern === RegexPattern.Jumping) {
                            result.o = matches[2];
                            let splits = result.o.split('/');
                            let numberOfResults = splits.length;
                            if (numberOfResults === 4) {
                                result.d = Number(splits[0]);
                                result.e = Number(splits[1]);
                                result.f = Number(splits[2]);
                                result.g = Number(splits[3]);
                            }
                            if (numberOfResults === 3) {
                                result.d = Number(splits[0]);
                                result.e = 0;
                                result.f = Number(splits[1]);
                                result.g = Number(splits[2]);
                            }
                            if (numberOfResults === 2) {
                                result.d = Number(splits[0]);
                                result.e = Number(splits[1]);
                            }
                        }
                        if (!updatePendingScore) {
                            this.scores.push(new Score(competitionFei, currentEntry, result, 0));
                        }
                        currentEntry = [];
                    }
                });

                // known competition?
                if (this.competitions.find(c => c.Fei === competitionFei) === undefined) {
                    this.competitions.push(new Competition(new CompetitionDTO(competitionFei, competitionEventSeries)));
                }

                // see if there are any horses/riders/competitions in the scores we don't list yet
                this.scores.forEach(s => {
                    if (this.horses.find(h => h.Fei === s.Horse.Fei) === undefined) {
                        this.horses.push(s.Horse);
                    }
                    if (this.riders.find(r => r.Fei === s.Rider.Fei) === undefined) {
                        this.riders.push(s.Rider);
                    }
                });

                this.printOut();
            });
    }

    private printOut() {
        let jsonStringify = require('json-pretty');
        let dto = new DatablockDTO(this);
        saveAs(new Blob([jsonStringify(dto.c)], {type: 'application/json'}), 'competitions.json');
        saveAs(new Blob([jsonStringify(dto.e)], {type: 'application/json'}), 'eventserieses.json');
        saveAs(new Blob([jsonStringify(dto.h)], {type: 'application/json'}), 'horses.json');
        saveAs(new Blob([jsonStringify(dto.p)], {type: 'application/json'}), 'photos.json');
        saveAs(new Blob([jsonStringify(dto.r)], {type: 'application/json'}), 'riders.json');
        saveAs(new Blob([jsonStringify(dto.s)], {type: 'application/json'}), 'scores.json');
    }
}
