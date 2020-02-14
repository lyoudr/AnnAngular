import { AuthService } from './auth.service';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';

describe('HttpClient testing', () => {
    let authService : AuthService;
    let httpTestingController : HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService],
            imports: [HttpClientTestingModule]
        });

        // Inject the http service and test controller for each test
        httpTestingController = TestBed.get(HttpTestingController);
        authService = TestBed.get(AuthService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    // Expecting and ansering requests
    it('AuthService Login retun right response', () => {
        const UserInfo = {
            'name': 'Json',
            'password' : 'json123'
        };
        const response = {
            'response': 'ok',
            'token': 'jsonToken'
        }
        authService.Login(UserInfo).subscribe(value => {
            expect(JSON.parse(value)).toEqual(response);
        });
        const req = httpTestingController.expectOne('http://127.0.0.1:4500/login');
        req.flush(response);
    });
});
