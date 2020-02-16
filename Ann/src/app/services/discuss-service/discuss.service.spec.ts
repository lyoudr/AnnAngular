// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpErrorResponse, HttpClient } from '@angular/common/http';

// Other imports
import { DiscussService } from './discuss.service';
import { TestBed } from '@angular/core/testing';



describe('*Service* => DiscussService', () => {
    let discussService: DiscussService;
    let httpClient : HttpClient;
    let httpTestingController : HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, HttpClientModule],
            // Provide both the service-to-test and its (spy) dependency
            providers: [
                DiscussService,
            ]
        });
        // Inject both the service-to-test and its (spy) dependency
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        discussService = TestBed.inject(DiscussService);
    });

    // Tests begin //
    it('#getMessage', () => {
        const testData = [
            {name: 'Json', message: 'Hello'},
            {name: 'me', message: 'Hi~'},
            {name: 'Json', message: 'Where do you live ?'},
            {name: 'me', message: 'I live in Taipei now.'}
        ];
        discussService.getMessage('Json').subscribe(data => {
            expect(data).toBe(testData);
        });
        const req = httpTestingController.expectOne('http://127.0.0.1:4500/getmessage?getmessage=Json');

        // Assert that the request is a GET.
        expect(req.request.method).toEqual('GET');
        req.flush(testData);
        httpTestingController.verify();
    });

    it('#get', () => {
        const testData = {'name': 'Joanna'};
        const testUrl = 'http://127.0.0.1:4500/search_discuss_sidenav';
        // Make an HTTP GET request
        httpClient.post(testUrl, 'Joanna').subscribe(data =>
            // When observable resolves, result should match test data
            expect(data).toEqual(testData)
        );

        // The following `expectOne()` will match the request's URL.
        // If no requests or multiple requests matched that URL
        // `expectOne()` would throw.
        const req = httpTestingController.expectOne(testUrl);

        // Assert that the request is a GET.
        expect(req.request.method).toEqual('POST');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        req.flush(testData);

        // Finally, assert that there are no outstanding requests.
        httpTestingController.verify();
    });
});


