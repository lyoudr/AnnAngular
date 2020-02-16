import { CalendarService } from './calendar.service';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';

describe('*Service* => CalendarService', () => {
    let calendarService : CalendarService;
    let httpClient : HttpClient;
    let httpTestingController : HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                HttpClientModule
            ],
            providers: [
                CalendarService
            ]
        });
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        calendarService = TestBed.inject(CalendarService);
    });

    it('#postTodolists', () => {
        const mockmemorandum = {
            user: "Json",
            data:{
                Jan: [],
                Feb: [ 
                {0: {date: "", data: Array(0)}},
                {1: {date: "", data: Array(0)}},
                {2: {date: "", data: Array(0)}},
                {3: {date: "", data: Array(0)}},
                {4: {date: "", data: Array(0)}},
                {5: {date: "", data: Array(0)}},
                {6: {date: 1, data: Array(1)}},
                {7: {date: 2, data: Array(1)}},
                {8: {date: 3, data: [{ title: "123", content: "456", color: "#8080ff"}]}},
                {9: {date: 4, data: Array(0)}},
                {10: {date: 5, data: Array(0)}},
                {11: {date: 6, data: Array(0)}},
                {12: {date: 7, data: Array(0)}},
                {13: {date: 8, data: Array(0)}},
                {14: {date: 9, data: Array(0)}},
                {15: {date: 10, data: Array(0)}},
                {16: {date: 11, data: Array(0)}},
                {17: {date: 12, data: Array(0)}},
                {18: {date: 13, data: Array(0)}},
                {19: {date: 14, data: Array(0)}},
                {20: {date: 15, data: Array(0)}},
                {21: {date: 16, data: Array(0)}},
                {22: {date: 17, data: Array(0)}},
                {23: {date: 18, data: Array(0)}},
                {24: {date: 19, data: Array(0)}},
                {25: {date: 20, data: Array(0)}},
                {26: {date: 21, data: Array(0)}},
                {27: {date: 22, data: Array(0)}},
                {28: {date: 23, data: Array(0)}},
                {29: {date: 24, data: Array(0)}},
                {30: {date: 25, data: Array(0)}},
                {31: {date: 26, data: Array(0)}},
                {32: {date: 27, data: Array(0)}},
                {33: {date: 28, data: Array(0)}},
                {34: {date: 29, data: Array(0)}},
                ],
                Mar: [],
                Apr: [],
                May: [],
                Jun: [],
                July: [],
                Aug: [],
                Sep: [],
                Oct: [],
                Nov: [],
                Dec: []
            }
        };
        calendarService.postTodolists(mockmemorandum)
            .subscribe(data => expect(data).toEqual({calendar: 'ok'}));
        const req = httpTestingController.expectOne('http://127.0.0.1:4500/postcalendar');
        expect(req.request.method).toEqual('POST');
        req.flush({calendar: 'ok'});
        httpTestingController.verify();
    });
    it('#getTodolist', () => {
        calendarService.getTodolist('Feb', 'Json')
            .subscribe(data => expect(data).toContain({date: "", data: []}));
        const req = httpTestingController.expectOne('http://127.0.0.1:4500/getcalendar?month=Feb&user=Json');
        expect(req.request.method).toEqual('GET');
        httpTestingController.verify();
    });
});