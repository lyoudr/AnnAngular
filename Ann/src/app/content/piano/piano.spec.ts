import { PianoComponent } from './piano.component';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { pianoroutes } from './piano-routing.module';
import { SheetComponent } from './sheet/sheet.component';

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

describe('PianoComponent DOM Test', () => {
    it('should create', () => {
        TestBed.configureTestingModule({
            declarations: [PianoComponent, SheetComponent],
            imports: [RouterModule.forRoot(pianoroutes)]
        });
        const fixture = TestBed.createComponent(PianoComponent);
        const pianocomp = fixture.componentInstance;
        expect(pianocomp).toBeDefined();
    });
});
