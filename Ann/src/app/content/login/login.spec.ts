import { LoginComponent } from './login.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
// Http testing module and mocking controller
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
// The ComponentFixtureAutoDetect service responds to asynchronous activities such as promise resolution, timers, and DOM events.
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

describe('BannerComponent (with beforeEach)', () => {
    // Variable Area
    let authService: AuthService;
    let cookieService: CookieService;
    let router: Router;
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
  
    beforeEach(() => {
      // Mock, Stub
      const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'pareUrl']);
      let authServiceStub : Partial<AuthService>;

      authServiceStub = {
        isLoggedIn : false,
        redirectUrl : ''
      }

      TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        providers: [
            CookieService,
            {provide: AuthService, useValue: authServiceStub},
            {provide: Router, useValue: routerSpy},
            {provide: ComponentFixtureAutoDetect, useValue: true}
        ],
        imports: [HttpClientTestingModule]
      });
      fixture = TestBed.createComponent(LoginComponent); // LoginComponent test instance
      component = fixture.componentInstance;
      authService = TestBed.get(AuthService);
    });
  
    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should have <span> with "Name"', () => {
        const loginElement : HTMLElement = fixture.nativeElement;
        const span = loginElement.querySelectorAll('span')[0];
        expect(span.textContent).toEqual('Name');
    });

    it('should find the <span> with fixture.debugElement.query(By.css)', () => {
        const originalDe : DebugElement = fixture.debugElement;
        const passwordDe : HTMLElement = originalDe.nativeElement;
        const span = passwordDe.querySelectorAll('span')[1];
        expect(span.textContent).toEqual('Password')
    });

    it('should convert name and password', () => {
      // get the name's input and display elements from the DOM
      const hostElement = fixture.nativeElement;
      const nameInput: HTMLInputElement = hostElement.querySelectorAll('input')[0];
      const passWord: HTMLInputElement = hostElement.querySelectorAll('input')[1];

      // simulate user entering a new name into the input box
      nameInput.value = 'Ann';
      passWord.value = '123456';

      // dispatch a DOM event so that Angular learns of input value change.
      // use newEvent utility function (not provided by Angular) for better browser compatibility
      nameInput.dispatchEvent(new Event('input'));
      passWord.dispatchEvent(new Event('input'));

      // Tell Angular to update the display binding through the title pipe
      fixture.detectChanges();
      
      expect(nameInput.value).toBe('Ann');
      expect(passWord.value).toBe('123456');
    });

    it('should return right response in AuthService', () => {
        authService.isLoggedIn = true;
        authService.redirectUrl = '/blog';
        fixture.detectChanges();
        expect(authService.isLoggedIn).toBe(true);
        expect(authService.redirectUrl).toBe('/blog');
    });
});