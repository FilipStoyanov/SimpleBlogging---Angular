import { Component, OnInit } from '@angular/core';
import { Blog } from '../interfaces/interfaces';
import { ApiClientService } from '../services/api-client.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  blogs: Blog[] = [];
  showAlert: boolean = false;

  constructor(private blogService: ApiClientService) {
    this.blogService.getAll().subscribe(
      data => this.blogs = data,
      //
    );
  }

  removeBlog(blog: Blog): void {
    const ind = this.blogs.indexOf(blog);
    this.blogs.splice(ind, 1);
    this.showAlert = true;
    setTimeout( () => {
      this.showAlert = false;
    }, 3000);
  }

  ngOnInit(): void {
  }

}
