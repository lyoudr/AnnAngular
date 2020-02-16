
// Testing HTTP services

// test a data service with an injected HttpClient spy as you would tet any service with a dependency

import { PianoService } from './piano.service';
import { Router, NavigationEnd } from '@angular/router';
import { asyncData } from 'src/app/testing/async-observable-helpers';

let httpClientSpy : { get : jasmine.Spy };
let pianoService : PianoService;
let router : Router;

describe('*Service* => PianoService', () => {
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        pianoService = new PianoService(<any>httpClientSpy, router);
    });

    it('#getmusicsheet', async() => {
        const musictypes = ['Classic', 'Morden', 'Jazz', 'Movie', 'Cartoon'];
        const musicanswers = [
            ['A', 'B', 'C'], 
            ['B', 'D'],
            ['C', 'D'],
            ['D'],
            ['E']
        ];
        musictypes.forEach((type, index) => {
            httpClientSpy.get.and.returnValue(asyncData(musicanswers[index]));
            pianoService.getmusicsheet(type).subscribe(data => 
                expect(data).toEqual(musicanswers[index]),
                fail
            );
        });
    });
});