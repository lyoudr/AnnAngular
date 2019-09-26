import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.scss']
})
export class BlogpostComponent implements OnInit {

  post$: Observable<any>;
  title: any;
  ingredients : any;
  steps: any;
  imgsrc : string;
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit() {
    // 得到 router 的參數，並且以此參數 call API，取得此貼文的內容
    this.post$ = this.route.paramMap.pipe(
      switchMap(params => {
        const postId = params.get('id');
        this.imgsrc = `../../../../assets/image/${postId}.jpg`;
        return this.blogService.getPosts(postId);
      })
    );
    // 訂閱此 Observable
    this.post$.subscribe(returnedpost => {
      this.title = returnedpost.title;
      this.ingredients = returnedpost.ingredients;
      this.steps = returnedpost.steps;
    });
  }

}
