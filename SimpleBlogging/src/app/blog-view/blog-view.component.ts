import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from '../services/api-client.service';
import { Blog } from '../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {

  data: Blog;
  id: string | null;

  constructor(private router: ActivatedRoute, private blogService: ApiClientService) {
      this.id = this.router.snapshot.paramMap.get("id");
      this.data = {date: new Date(), status: '', image: ''};
      if(this.id){
        this.blogService.getById(this.id).subscribe(
          result => {
            this.data = result;
          },
          //
        );
      }
   }

  ngOnInit(): void {
  }

}
