import { Score } from './score';
import { Horse } from './horse';
import { Rider } from './rider';
import { Photo } from './photo';

export class ScoreHorseRider {
    public score: Score;
    public horse: Horse;
    public photo: Photo;
    public rider: Rider;

    constructor(score: Score, horse: Horse, rider: Rider, photo: Photo) {
      this.score = score;
      this.horse = horse;
      this.photo = photo;
      this.rider = rider;
    }

    public static sortByResult = (a: ScoreHorseRider, b: ScoreHorseRider) => {
        const aPosition = a.score.Result.p;
        const bPosition = b.score.Result.p;
        const aDrawnOrder = a.score.Draw;
        const bDrawnOrder = b.score.Draw;
        const aPenalties = a.score.Sum;
        const bPenalties = b.score.Sum;
        const aDnf = a.score.Dnf;
        const bDnf = b.score.Dnf;

        if ((aDnf && !bDnf) || (aPosition !== 'PEND' && bPosition === 'PEND')) {
            return -1;
        } else if ((bDnf && !aDnf) || (bPosition !== 'PEND' && aPosition === 'PEND')) {
            return 1;
        } else {
            if (aPenalties > bPenalties || (aPenalties === 0 && bPenalties !== 0)) {
                return -1;
            } else if (aPenalties < bPenalties || (bPenalties === 0 && aPenalties !== 0)) {
                return 1;
            }
            if (aDrawnOrder > bDrawnOrder) {
                return 1;
            } else if (aDrawnOrder < bDrawnOrder) {
                return -1;
            }
            return 0;
        }
    }
}
