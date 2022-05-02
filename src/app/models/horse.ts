import { Studbook, Colour, Legmarking, Sex } from 'src/app/enums';
import { Score } from './score';

export class Height {
    public Hands: number;
    public Inches: number;

    constructor(decimal: number) {
        if (decimal > 0) {
            const wholeHands = Math.floor(decimal);
            const partHands = decimal - wholeHands;

            // this has to be rounded because of Javascript floating point handling
            const displayPartHands = Math.round(10 * partHands);
    
            this.Hands = wholeHands;
            this.Inches = displayPartHands;
        }
    }
}

export class Legs {
    public nearfore: Legmarking;
    public offfore: Legmarking;
    public offhind: Legmarking;
    public nearhind: Legmarking;

    constructor(abbreviated: string) {
        if (abbreviated.length !== 4) {
            return;
        }
        this.nearfore = Legmarking[abbreviated[0]];
        this.offfore = Legmarking[abbreviated[1]];
        this.offhind = Legmarking[abbreviated[2]];
        this.nearhind = Legmarking[abbreviated[3]];
    }
}

export class HorseDTO {
    public n: string; // name, registered
    public f: string; // FEI ID
    public s?: string; // name, stable
    public c?: string; // colour, per Colour enum
    public x?: string; // sex, per Sex enum
    public h?: number; // height, expressed 16.2
    public d?: number; // year of birth
    public l?: string; // leg markings, as NEAR FORE - OFF FORE - OFF HIND - NEAR HIND
    public b?: string; // studbook, per Studbook enum
    public z?: number; // deceased
    public a?: string; // notes

    constructor(regdName: string, fei: string, stableName: string, sex: string, height: number, foaled: number, colour: string, legs: string, studbook: string, deceased: number, notes: string) {
        this.n = regdName;
        this.f = fei;
        this.s = stableName;
        this.c = colour;
        this.x = sex;
        this.h = height;
        this.d = foaled;
        this.l = legs;
        this.b = studbook;
        this.z = deceased;
        this.a = notes;
    }
}

export class Horse {
    private _regdName: string;
    private _fei: string;
    private _stableName?: string;
    private _sex?: string;
    private _height?: Height;
    private _foaled?: number;
    private _colour?: string;
    private _legs?: Legs;
    private _studbook?: string;
    private _deceased?: number;
    private _notes?: string;
    private _dto: HorseDTO;

    public scores: Score[];

    constructor(dto: HorseDTO) {
        this._dto = dto;

        this._regdName = dto.n;
        this._fei = dto.f;
        this._stableName = dto.s;
        this._sex = dto.x;
        this._height = new Height(dto.h);
        this._foaled = dto.d;
        this._colour = dto.c;
        this._legs = new Legs(dto.l);
        this._studbook = dto.b;
        this._deceased = dto.z;
        this._notes = dto.a;
    }

    get Dto(): HorseDTO {
        return this._dto;
    }

    get Name(): string {
        return this._regdName + (this._stableName ? ' (' + this._stableName + ')' : '');
    }

    get Deceased(): boolean {
        return this._deceased > 0;
    }

    get Studbook(): string {
        if (!this._studbook) {
            return '';
        }
        return Studbook[this._studbook] + ' (' + this._studbook + ')';
    }

    get Fei(): string {
        return this._fei;
    }

    get Height(): string {
        if (!this._height.Hands) {
            return '';
        }
        return this._height.Hands + '.' + this._height.Inches + 'hh';
    }

    get Age(): string {
        if (!this._foaled) {
            return '';
        }
        let dateTo = new Date();
        if (this._deceased) {
            dateTo = new Date(this._deceased, 1, 1);
        }
        return (dateTo.getFullYear() - this._foaled) + 'yo';
    }

    get Sex(): string {
        if (!this._sex) {
            return '';
        }
        return Sex[this._sex].toLocaleLowerCase();
    }

    get SvgColour(): string {
        return this.Colour.replace(' ', '');
    }

    get Colour(): string {
        if (!this._colour) {
            return '';
        }
        return Colour[ this._colour].toLocaleLowerCase().replace('bay', ' bay').replace('chestnut', ' chestnut').replace('brown', ' brown').trim();
    }

    get Notes(): string {
        if (!this._notes) {
            return '';
        }
        return this._notes;
    }

    get Nearfore(): string {
        return this._legs.nearfore ? this._legs.nearfore.toLocaleLowerCase() : 'none';
    }

    get Offfore(): string {
        return this._legs.offfore ? this._legs.offfore.toLocaleLowerCase() : 'none';
    }

    get Offhind(): string {
        return this._legs.offhind ? this._legs.offhind.toLocaleLowerCase() : 'none';
    }

    get Nearhind(): string {
        return this._legs.nearhind ? this._legs.nearhind.toLocaleLowerCase() : 'none';
    }

    static sortHorsesByRecent(horses: Horse[], riderScores: Score[]): Horse[] {
        return horses.sort((a, b) => {
            const sortScoresByRecent = (x: Score, y: Score) => y.Competition.Fei.localeCompare(x.Competition.Fei);
            const horseAMostRecentCompetitionYear = riderScores.filter(s => s.Horse.Fei === a.Fei).sort(sortScoresByRecent)[0].Competition.Fei.substring(0, 4);
            const horseBMostRecentCompetitionYear = riderScores.filter(s => s.Horse.Fei === b.Fei).sort(sortScoresByRecent)[0].Competition.Fei.substring(0, 4);
            return +horseBMostRecentCompetitionYear - +horseAMostRecentCompetitionYear;
        });
    }
}
