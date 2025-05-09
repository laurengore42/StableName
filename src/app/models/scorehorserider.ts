import { Score } from './score';
import { Horse } from './horse';
import { Rider } from './rider';

export class ScoreHorseRider {
    public score: Score;
    public horse: Horse;
    public rider: Rider;

    constructor(score: Score, horse: Horse, rider: Rider) {
      this.score = score;
      this.horse = horse;
      this.rider = rider;
    }

    public static sortByDrawOrder = (a: ScoreHorseRider, b: ScoreHorseRider) => {
        const aDrawnOrder = a.score.Draw;
        const bDrawnOrder = b.score.Draw;

        if (aDrawnOrder > bDrawnOrder) {
            return 1;
        } else if (aDrawnOrder < bDrawnOrder) {
            return -1;
        }
        return 0;
    }

    public static sortByResult = (a: ScoreHorseRider, b: ScoreHorseRider) => {
        const aPosition = a.score.Result.p;
        const bPosition = b.score.Result.p;
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

            return this.sortByDrawOrder(a,b);
        }
    }
}
