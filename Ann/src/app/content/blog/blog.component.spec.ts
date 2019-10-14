import { BlogComponent } from './blog.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { AddpostComponent } from './addpost/addpost.component';
import { BloghomeComponent } from './bloghome/bloghome.component';
import { SharedModule } from '../../shared/shared.module';
import { TestBed, ComponentFixture, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { blogroutes } from './blog-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BlogComponent DOM async testing', () =>{
    
    let router: Router;
    let blogcomponent: BlogComponent;
    let fixture: ComponentFixture<BlogComponent>;
    let getRouterEvent : any;
    let routerEvent: any;
    let blogImg: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                BlogComponent, 
                BlogpostComponent, 
                AddpostComponent, 
                BloghomeComponent
            ],
            imports: [
                RouterTestingModule.withRoutes(blogroutes),
                ReactiveFormsModule,
                SharedModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        fixture = TestBed.createComponent(BlogComponent);
        blogcomponent = fixture.componentInstance;
        blogImg = fixture.nativeElement.querySelector('#blogImg');
    });

    it('should create', () => {
        expect(blogcomponent).toBeDefined();
    });

    it('should appear after if router event.url === "/blog"', fakeAsync(() => {
        fixture.detectChanges(); // onInit()
        tick(1000); // delay 1 s 
        expect(blogImg.style.display).toBe('');
        discardPeriodicTasks();
    }));
    it('blogImg should disappear after clicking', () => {
        fixture.detectChanges();
        blogImg.click();
        setTimeout(() => {
          expect(blogImg.style.display).toBe('none');
        }, 1000);
    });
});