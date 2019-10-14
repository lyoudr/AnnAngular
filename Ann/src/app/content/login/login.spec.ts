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

describe('Login Component Service test', () => {
  let logincomp : LoginComponent;
  let authService : AuthService;
  let cookieService: CookieService;
  let UserInfoList: any;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'parseUrl']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginComponent,
        AuthService,
        CookieService,
        { provide: Router, useValue: routerSpy}
      ],
      imports: [HttpClientTestingModule]
    });
    // Inject this service to each test by calling TestBed.get() with the service class as the argument.
    logincomp = TestBed.get(LoginComponent);
    authService = TestBed.get(AuthService);
    cookieService = TestBed.get(CookieService);
    router = TestBed.get(Router);
    UserInfoList = [
      {
        'name': 'Json',
        'password': 'json123'
      },{
        'name': 'Joy',
        'password': 'joy123'
      },{
        'name': 'Amy',
        'password': 'amy123'
      },{
        'name': 'Tonal',
        'password': 'tonal123'
      },{
        'name': 'Joanna',
        'password': 'joanna123'
      }
    ];
  });

  it('#should return right response after enter right name and password', () => {
    UserInfoList.forEach((UserInfo, index) => {
      authService.Login(UserInfo)
        .subscribe(data => {
          if(data.response == 'ok'){
            expect(JSON.parse(data.response)).toBe('ok');
            switch(index){
              case 0:
                expect(JSON.parse(data.token)).toBe('json123');
                break;
              case 1:
                expect(JSON.parse(data.token)).toBe('joyToken');
                break;
              case 2:
                expect(JSON.parse(data.token)).toBe('amyToken');
                break;
              case 3:
                expect(JSON.parse(data.token)).toBe('tonalToken');
                break;
              case 4: 
                expect(JSON.parse(data.token)).toBe('joannaToken');
                break;
              default:
                expect(JSON.parse(data.token)).toBe('json123');
                break;
            };
          }
        });
    });
  });

  it('should have right cookie after Login && isLogged In is true', () => {
    UserInfoList.forEach((UserInfo) => {
      authService.Login(UserInfo)
        .subscribe(data => {
          if(data.response == 'ok'){
            const lowercaseName = UserInfo.name.replace(/^\w/, c => c.toLowerCase());
            expect(cookieService.get('UserID')).toBe(`${lowercaseName}Token`);
            expect(authService.isLoggedIn).toBe(true);
          }
        });
    });
  });  

  it('should start countdown after login', () => {
    UserInfoList.forEach((UserInfo) => {
      authService.Login(UserInfo)
        .subscribe(data =>{
          if(data.response == 'ok'){
            authService.countdown$.subscribe(time => {
              expect(authService.counter).toBe(authService.counter - 1)
            });
          }
        });
    });
  });

  it('should tell ROUTER to navigate when logged In', () => {
    // use redirect
    const redirect = authService.redirectUrl ? 
    router.parseUrl(authService.redirectUrl) : '/blog';

    // expecting to navigate to '/blog' page or the authService.redirectUrl
    UserInfoList.forEach(UserInfo => {  
      authService.Login(UserInfo)
        .subscribe(data => {
          if(data.response == 'ok'){
            // args passed to router.navigateByUrl() spy
            const spy = router.navigateByUrl as jasmine.Spy;
            const navArgs = spy.calls.first().args[0];
            expect(navArgs).toBe(redirect || '/blog', 'should navigate to Specific Component');
          }
        });
    });
  });
});