import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';


class MockCookieService{}

class MockRouter{}

describe('*Component* => LoginComponent', () => {
    let loginComp : LoginComponent;
    let fixture : ComponentFixture<LoginComponent>;
    let authService : AuthService;
    let cookieService : CookieService;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [
                AuthService,
                HttpClient,
                HttpHandler,
                {provide: CookieService, useClass: MockCookieService},
                {provide: Router, useClass: MockRouter}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        loginComp = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        cookieService = TestBed.inject(CookieService);
    }));

    it('should create', () => {
        expect(loginComp).toBeDefined();
    });

    it('should have value after login success', async() => {
        let result : any = await loginComp.Login('Json', 'json123');
        if(result === true){
            expect(authService.isLoggedIn).toBe(true);
            setTimeout(() => {
                expect(authService.counter).toEqual(authService.counter - 1);
            }, 1000);
        }
    });

    it('should not have value after login failed', async() => {
        let result : any = await loginComp.Login('Bob', 'bob123');
        if(result === true){
            expect(authService.isLoggedIn).toBe(false);
            setTimeout(() => {
                expect(authService.counter).toBe(900);
            }, 1000);
        }
    });
});

