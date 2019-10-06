import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';


describe('AuthService', () => {
    let authservice: AuthService;
    let http: HttpClient;
    let UserInfo = {
        'name': 'Json',
        'password': 'json123'
    };
    beforeEach(() => {authservice = new AuthService(http) ;});
    
    it('#getObservableValue should return value from observalbe', (done: DoneFn) => {
        authservice.Login(UserInfo).subscribe(value => {
            expect(value).toBe({'response': 'ok', 'token': 'jsonToken'});
            done();
        });
    })
})