import { DiscussComponent} from './discuss.component';
import { DiscussService} from '../../services/discuss.service';
import { CookieService } from 'ngx-cookie-service';
// Http testing module and mocking controller
import { HttpClientTestingModule } from '@angular/common/http/testing';
// Other imports
import { TestBed } from '@angular/core/testing';

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
        // Inject this service to each test by calling TestBed.get() with th e service class as the argument.
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