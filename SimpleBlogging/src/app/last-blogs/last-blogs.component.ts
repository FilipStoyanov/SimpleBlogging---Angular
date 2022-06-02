import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from '../services/api-client.service';
import { Blog } from '../interfaces/interfaces';

@Component({
  selector: 'app-last-blogs',
  templateUrl: './last-blogs.component.html',
  styleUrls: ['./last-blogs.component.scss']
})
export class LastBlogsComponent implements OnInit {

  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  constructor(private router: Router, private blogService: ApiClientService) {
       this.blogService.getAll().subscribe(
         data => {
           this.blogs = data.sort((a,b) => new Date(b.date).setHours(0,0,0,0) - new Date(a.date).setHours(0,0,0,0)).slice(0,4);
           this.filteredBlogs = data.sort((a,b) => new Date(b.date).setHours(0,0,0,0) - new Date(a.date).setHours(0,0,0,0)).slice(0,4);
         },
         // s
       )
   }

   activateFilter(): void {
     this.filteredBlogs = this.blogs.filter( obj => obj.status === 'activate');
   }

   deactivateFilter(): void {
     this.filteredBlogs = this.blogs.filter( obj => obj.status === 'deactivate');
   }

   clearFilters(): void {
     this.filteredBlogs = this.blogs;
   }



  ngOnInit(): void {
  }

}
