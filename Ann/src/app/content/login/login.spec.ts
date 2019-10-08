import { LoginComponent } from './login.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
// Http testing module and mocking controller
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('BannerComponent (with beforeEach)', () => {
    let authService: AuthService;
    let cookieService: CookieService;
    let router: Router;
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
  
    beforeEach(() => {
      const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'pareUrl']);
      TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        providers: [
            AuthService,
            CookieService,
            {provide: Router, useValue: routerSpy}
        ],
        imports: [HttpClientTestingModule]
      });
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
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
});