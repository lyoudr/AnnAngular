import { DiscussComponent} from './discuss.component';
import { DiscussService} from '../../services/discuss.service';
import { CookieService } from 'ngx-cookie-service';
// Http testing module and mocking controller
import { HttpClientTestingModule } from '@angular/common/http/testing';
// Other imports
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError} from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { asyncData } from '../../testing/async-observable-helpers';

describe('DiscussComponent', () => {
    let discusscomp : DiscussComponent;
    let discussService : DiscussService;
    let cookieService : CookieService;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DiscussComponent,
                DiscussService, 
                CookieService
            ],
            imports : [HttpClientTestingModule]
        });
        // Inject this service to each test by calling TestBed.get() with the service class as the argument.
        discusscomp = TestBed.get(DiscussComponent);
        discussService = TestBed.get(DiscussService);
        cookieService = TestBed.get(CookieService);
    });

    it('#changeChat() should change chattype', () => {
        const chattype = ['chat', 'phone', 'contact', 'notification'];
        chattype.forEach((type) => {
            discusscomp.changeChat(type);
            expect(discusscomp.chattype).toBe(type);
        });
    });

    it('#showMessage() should return right message from discussService', () => {
        let personId = ['Json', 'Joy', 'Amy', 'Tonal'];
        let resPonses = [
            [
                {name: 'Json', message: 'Hello'},
                {name: 'me', message: 'Hi~'},
                {name: 'Json', message: 'Where do you live ?'},
                {name: 'me', message: 'I live in Taipei now.'}
            ],
            [
                {name: 'Joy', message: "I'm sad."},
                {name: 'me', message: 'Why?'},
                {name: 'Joy', message: 'Cause the wether is blue.'},
                {name: 'me', message: 'Hope I can make you happy :)'} 
            ],
            [
                {name: 'Amy', message: "Hey, sister, do you wanna go shopping this weekend ?"},
                {name: 'me', message: 'Sounds good. which shopping district do you want to go ?'},
                {name: 'Amy', message: 'Um... maybe Ximending?'},
                {name: 'me', message: "That's a good idea."}
            ],
            [
                {name: 'Tonal', message: "How's your life in London ? "},
                {name: 'me', message: 'Not bad, but I still try to adapt to the new environment. try to know some friends , you know...'},
                {name: 'Tonal', message: 'It is lonely to live there alone ? sounds like you need more friend.'},
                {name: 'me', message: "Sometimes, but I think I'll get better and better. thanks for your concern."} 
            ]
        ];
        personId.forEach((person, index) => {
            discussService.getMessage(person).subscribe(value => {
                expect(JSON.parse(value)).toEqual(resPonses[index]);
            });
        });
    });

    it('#has user value after ngOnInit', () => {
        expect(cookieService.get('UserID')).toBe('');
        discusscomp.ngOnInit();
        // After ngOnInit
        expect(discusscomp.user).toBe('');
    });

    it('#when enter "J", should return right name after one second', () => {
        discusscomp.ngOnInit();
        discusscomp.onKey('J');
        discusscomp.searchResult$.subscribe(data => {
            expect(JSON.parse(data)).toBe(['Json', 'Joy', 'Joanna']);
        });
    });
});

describe('Discuss DOM testeing', () => {
        let testResponse : any;
        let getSearchResultSpy : any;
        let fixture: ComponentFixture<DiscussComponent>;
        let discusscomp: DiscussComponent;
        let contactsEl: HTMLElement;
        let phonesEl : HTMLElement;

    beforeEach(() => {
        testResponse = [{'name': 'Json'}, {'name': 'Joy'}, {'name': 'Joanna'}];

        // Create a fake DiscussService object with a `getSearchResult`
        const discussService = jasmine.createSpyObj('DiscussService', ['getSerchResult']);
        // Make the spy return a synchronous Observable with the test data
        getSearchResultSpy = discussService.getSerchResult.and.returnValue(of(testResponse))
        getSearchResultSpy.and.returnValue(asyncData(testResponse));

        TestBed.configureTestingModule({
            declarations: [DiscussComponent],
            providers: [
                {provide: DiscussService, useValue: discussService},
                CookieService
            ],
            imports: [HttpClientTestingModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        fixture = TestBed.createComponent(DiscussComponent);
        discusscomp = fixture.componentInstance;
        
    });

    it('should show right contact and phone after enter "J"', () => {
        contactsEl = fixture.nativeElement.querySelector('.phones');
        phonesEl = fixture.nativeElement.querySelector('.contacts');
        const hostElement = fixture.nativeElement;
        const searchInput : HTMLInputElement = hostElement.querySelector('input');
        // simulate user entering a "J" to search input box
        searchInput.value = "J";

        // dispatch a DOM event so that Angular learns of input value changes.
        searchInput.dispatchEvent(new Event('input'));

        // Tell Angular to uptdate the display binding throught the title pipe
        fixture.detectChanges();
        setTimeout(() => {
            expect(contactsEl.childNodes.forEach((value, index) => {
                expect(value.textContent).toBe(testResponse[index].name);
            }));
            expect(phonesEl.childNodes.forEach((value, index) => {
                expect(value.textContent).toBe(testResponse[index].name);
            }));
            expect(getSearchResultSpy.calls.any()).toBe(true, 'getSearchResult called');
        }, 1000);
    });

    
});