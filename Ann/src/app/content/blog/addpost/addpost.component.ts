import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../../../services/blog-service/blog.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss'],
})
export class AddpostComponent implements OnInit {

  addPostForm = this.fb.group({
    title: [''],
    file: [''],
    post: ['']
  });

  fileToUpload: File = null;
  imagelists : any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private blogService: BlogService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.blogService.blogPost(this.addPostForm.value)
      .subscribe(returnedpost => {
        const newpost = {
          date: returnedpost['date'],
          title: returnedpost['title'],
          url: `post/${returnedpost['title']}`,
          content: returnedpost['content']
        }
        this.blogService.postlist.push(newpost);
      });
    this.router.navigate(['/blog/postlist']);
  }
  clickUpload(fileInput){
    fileInput.click();
  }
  uploadFile(files: FileList){
    this.fileToUpload = files['0'];
    this.blogService.postFile(this.fileToUpload)
      .subscribe(Imgdata => {
        const imgsrc = this.ImageSrc(Imgdata.buffer.data);
        this.imagelists.push(this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+ imgsrc));
      });
  }
  ImageSrc(buffer){
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.length;
    for(var i = 0; i < len; i++){
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
