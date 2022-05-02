import { Studbook } from '../enums';
import { Horse, HorseDTO } from './horse';
import { Rider, RiderDTO } from './rider';
import { Competition, CompetitionDTO } from './competition';
import { ToTitleCase } from '../shared/utils';

export class Result {
    public p: string; // final position on scoreboard, or EL / RET / WD / DSQ
    public a?: number; // dressage score
    public b?: number; // cross-country obstacle faults
    public c?: number; // cross-country time faults
    public d?: number; // showjumping obstacle faults
    public e?: number; // showjumping time faults
    public f?: number; // jump-off, if any, obstacle faults
    public g?: number; // jump-off, if any, time faults
    public o: string; // final score, or nature of EL / RET / WD / DSQ incident
}

export class ScoreDTO {
    public c: string; // competition
    public r: string; // rider
    public h: string; // horse
    public d?: number; // number on the draw list
    public t: Result; // result

    constructor(s: Score) {
        this.c = s.Competition.Fei;
        this.r = s.Rider.Fei;
        this.h = s.Horse.Fei;
        this.d = s.Draw;
        this.t = s.Result;
    }
}

export class Score {
    private _rider: string;
    private _ridername: string;
    private _ridernation: string;
    private _horse: string;
    private _horsename: string;
    private _horsestudbook: string;
    private _competition: string;
    private _result: Result;
    private _draw?: number;

    constructor(competition: string, scoreFacts: string[], result: Result, draw: number) {
        // [0] is final scored position at that competition
        // [1] is rider's FEI ID e.g. '10005015'
        // [2] is rider's name and nationality e.g. 'Michael JUNG (GER)'
        // [3] is horse's FEI ID e.g. 'GER40255'
        // [4] is horse's name e.g. 'LA BIOSTHETIQUE - SAM FBW'
        // [5], if it exists, is horse's studbook e.g. 'DSP'
        this._competition = competition;
        this._rider = scoreFacts[1];
        this._ridername = scoreFacts[2].substring(0, scoreFacts[2].indexOf('(') - 1);
        this._ridernation = scoreFacts[2].substring(scoreFacts[2].indexOf('(') + 1, scoreFacts[2].indexOf(')'));
        this._horse = scoreFacts[3];
        this._horsename = scoreFacts[4];
        if (scoreFacts.length > 5 && Studbook[scoreFacts[5]] !== undefined) {
            this._horsestudbook = scoreFacts[5];
        }
        this._result = result;
        this._result.p = scoreFacts[0].trim();
        this._draw = draw;
    }

    get Dnf() {
        return this._result.p === 'EL' || this._result.p === 'WD' || this._result.p === 'RET' || this._result.p === 'DSQ';
    }

    get Dto() {
        return new ScoreDTO(this);
    }

    get Horse() {
        return new Horse(new HorseDTO(ToTitleCase(this._horsename), this._horse, '', '', 0, 0, '', '', this._horsestudbook, 0, ''));
    }

    get Rider() {
        return new Rider(new RiderDTO(ToTitleCase(this._ridername), '', this._rider, '', 0, this._ridernation, ''));
    }

    get Result() {
        return this._result;
    }

    get Sum() {
        if (this._result.p === 'EL' || this._result.p === 'RET' || this._result.p === 'DSQ' || this._result.p === 'WD') {
            return 0;
        }
        return this._result.a + this._result.b + this._result.c + this._result.d + this._result.e;
    }

    get SumDisplay() {
        return (this._result.a + this._result.b + this._result.c + this._result.d + this._result.e).toFixed(1);
    }

    get Competition() {
        return new Competition(new CompetitionDTO(this._competition, ''));
    }

    get Draw() {
        return this._draw;
    }
}
