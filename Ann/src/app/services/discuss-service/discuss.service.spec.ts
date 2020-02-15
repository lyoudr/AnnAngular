import { DiscussService } from './discuss.service';
import { TestBed } from '@angular/core/testing';

let discussService : DiscussService

beforeEach(() => {
    TestBed.configureTestingModule({providers: [DiscussService]});
    //service = TestBed.inject()
});

