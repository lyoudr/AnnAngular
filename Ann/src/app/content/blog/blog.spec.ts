import { BlogComponent } from './blog.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterEvent } from '@angular/router';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';


describe('*Component* => BlogComponent', () => {
    let blogComp : BlogComponent;
    let fixture: ComponentFixture<BlogComponent>;
    let editelem : HTMLElement;

    const eventSubject = new ReplaySubject<RouterEvent>(1);

    const routerMock = {
        navigate: jasmine.createSpy('navigate'),
        events : eventSubject.asObservable(),
        url : 'test/url'
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BlogComponent],
            providers: [
                {provide: Router, useValue : routerMock},
                {provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(BlogComponent);
        blogComp = fixture.componentInstance;
        editelem = fixture.nativeElement.querySelector('#edit');
    });

    it('should right blog text', () => {
        expect(editelem.textContent).toEqual('Edit your blog');
        blogComp.title = 'Hello';
        fixture.detectChanges();
        expect(editelem.textContent).toBe('Hello');
    });
});