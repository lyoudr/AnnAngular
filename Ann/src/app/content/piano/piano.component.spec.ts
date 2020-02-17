import { PianoComponent } from './piano.component';
import { PianoService } from '../../services/piano-service/piano.service';

let pianoService : PianoService;
let pianoComp;
describe('*Component* => PianoComponent', () => {
    beforeEach(()=> {
        pianoComp = new PianoComponent(pianoService);
    });
    it('#selectMusic', () => {
        pianoComp.selectMusic(0);
        expect(pianoComp.typeindex).toBe(0);
        expect(pianoComp.classTitle).toBe(pianoComp.musictype[0]);
        expect(pianoComp.isSlideUp).toBe(true);
    });

    it('#rankPieces', () => {
        expect(pianoComp.ranktype).toBe('name');
        pianoComp.rankPieces('pieces');
        expect(pianoComp.ranktype).toBe('pieces');
    });

    it('#setCurrency', () => {
        expect(pianoComp.currencyCode).toBe('TWD');
        pianoComp.rankPieces('USD');
        expect(pianoComp.ranktype).toBe('USD');
    });
});