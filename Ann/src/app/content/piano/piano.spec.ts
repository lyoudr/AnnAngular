import { PianoComponent } from './piano.component';
import { TestBed } from '@angular/core/testing';

describe('PianoComponent Class Test', () => {
    let pianocomp : PianoComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PianoComponent]
        });
        pianocomp = TestBed.get(PianoComponent);
    });
    // Check if choose the music type would return the right type
    it('should right music type', () => {
        let indexs = [0, 1, 2, 3];
        indexs.forEach((value) => {
            pianocomp.selectMusic(value);
            expect(pianocomp.typeindex).toBe(value);
        });
    });
    it('should contain right music type in each list', () => {

    });
});
