export class PhotoDTO {
    public f: string; // FEI ID
    public p?: string; // photograph, as base64 JPG

    constructor(fei: string, photo: string) {
        this.f = fei;
        this.p = photo;
    }
}

export class Photo {
    private _fei: string;
    private _photo: string;
    private _dto: PhotoDTO;

    constructor(dto: PhotoDTO) {
        this._dto = dto;

        this._fei = dto.f;
        this._photo = dto.p;
    }

    get Dto(): PhotoDTO {
        return this._dto;
    }

    get Fei(): string {
        return this._fei;
    }

    get Photo(): string {
        if (!this._photo) {
            return '';
        }
        return this._photo;
    }
}
