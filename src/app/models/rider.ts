import { Nationality, Gender } from 'src/app/enums';
import { Horse } from './horse';
import { Score } from './score';

export class RiderDTO {
    public n: string; // competition name
    public f: string; // FEI ID
    public m?: string; // other names
    public b?: number; // year of birth
    public g?: string; // gender, per Gender enum
    public t?: string; // nationality, per Nationality enum
    public a?: string; // notes

    constructor(name: string, othername: string, fei: string, gender: string, born: number, nationality: string, notes: string) {
        this.n = name;
        this.m = othername;
        this.f = fei;
        this.g = gender;
        this.b = born;
        this.t = nationality;
        this.a = notes;
    }
}

export class Rider {
  private _name: string;
  private _othername: string;
  private _fei: string;
  private _born?: number;
  private _gender?: Gender;
  private _nationality?: Nationality;
  private _notes: string;
  private _dto: RiderDTO;

  public horses: Horse[];
  public scores: Score[];
  public horseList: string;

  constructor(dto: RiderDTO) {
      this._dto = dto;

      this._name = dto.n;
      this._othername = dto.m;
      this._fei = dto.f;
      this._gender = Gender[dto.g];
      this._born = dto.b;
      this._nationality = Nationality[dto.t];
      this._notes = dto.a;
  }

  get Dto(): RiderDTO {
      return this._dto;
  }

  get Name(): string {
      return this._name;
  }

  get OtherName(): string {
      return this._othername;
  }

  get Fei(): string {
      return this._fei;
  }

  get Notes(): string {
      if (!this._notes) {
          return '';
      }
      return this._notes;
  }

  get Nationality(): string {
      if (!this._nationality) {
          return '';
      }
      return Nationality[this._nationality];
  }

  get Age(): string {
      if (!this._born) {
          return '';
      }
      return Math.floor((new Date().getTime() - new Date(this._born, 1, 1).getTime()) / (1000 * 60 * 60 * 24 * 365.26)) + 'yo';
  }

  get BaseDescriptor(): string {
    const descriptors = [this.Age ?? "", this._nationality ?? "", this._gender ?? "", 'rider']
    return descriptors.filter(s => s.length > 0).join(" ");
  }
}
