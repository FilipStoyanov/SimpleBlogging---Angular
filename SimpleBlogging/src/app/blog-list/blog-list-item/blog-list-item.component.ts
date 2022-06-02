import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/interfaces/interfaces';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-blog-list-item',
  templateUrl: './blog-list-item.component.html',
  styleUrls: ['./blog-list-item.component.scss']
})
export class BlogListItemComponent implements OnInit {

  @Input()
  data!: Blog;
  @Output() deleteBlogEmitter: EventEmitter<Blog> = new EventEmitter();
  constructor(private blogService: ApiClientService, private router: Router) {
  }

  editBlog(): void {
      this.router.navigate([`/edit/${this.data.id}`]);
  }
  deleteBlog(): void {
    this.blogService.removeBlog(this.data).subscribe({});
    this.deleteBlogEmitter.emit(this.data);
  }
  routeToBlogView(): void{
    this.router.navigate([`blog/${this.data.id}`]);
  }
  ngOnInit(): void {
  }

}
