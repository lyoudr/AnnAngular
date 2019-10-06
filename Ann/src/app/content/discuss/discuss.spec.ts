import {DiscussComponent} from './discuss.component';
import {DiscussService} from '../../services/discuss.service';
import {CookieService } from 'ngx-cookie-service';

describe('DiscussComponent', () => {
    let discussService : DiscussService;
    let cookieService : CookieService;

    it('#changeChat() should change chattype', () => {
        const discusscomp = new DiscussComponent(discussService, cookieService);
        discusscomp.changeChat('chat');
        expect(discusscomp.chattype).toBe('chat');
    });
});