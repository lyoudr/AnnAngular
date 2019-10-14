import { PianoComponent } from './piano.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { pianoroutes } from './piano-routing.module';
import { SheetComponent } from './sheet/sheet.component';
import { DebugElement } from '@angular/core';
/* Automatic change detection */
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
    let pianocomp : PianoComponent;
    let fixture: ComponentFixture<PianoComponent>;
    let h5 : HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PianoComponent, SheetComponent],
            imports: [
                RouterModule.forRoot(pianoroutes),
                HttpClientTestingModule
            ],
            //providers: [{provide: ComponentFixtureAutoDetect, useValue: true}]
        });
        fixture = TestBed.createComponent(PianoComponent);
        pianocomp = fixture.componentInstance;
    });

    it('should create', () => {
        expect(pianocomp).toBeDefined();
    });

    it('should display right name of each list', () => {
        const listDe : DebugElement = fixture.debugElement;
        const listEl : HTMLElement = listDe.nativeElement;
        const lists = listEl.querySelectorAll('li');
        lists.forEach((name, index) => {
            expect(name).toBe(pianocomp.musictype[index]);
        });
    });

    it('should change title', () => {
        const h5De : DebugElement = fixture.debugElement;
        const h5El : HTMLElement = h5De.nativeElement;
        const h5 = h5El.querySelector('h5');
        pianocomp.classTitle = 'Good';
        fixture.detectChanges();
        expect(h5.textContent).toContain('Good');
    });
});
