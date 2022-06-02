import { Component, OnInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiClientService } from '../services/api-client.service';
import { Blog } from '../interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable, of } from 'rxjs';

export interface Key {
  name: string;
}

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit, DoCheck {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  keys: string[] = [];

  valid: boolean;

  blogForm = new FormGroup({
    date: new FormControl({}),
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
    keywords: new FormControl([]),
    imageUrl: new FormControl(''),
    status: new FormControl('activate'),
  });

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
};

  editedBlog: Blog = { id: 0, date: new Date(0), title: '', author: '', image: '', description: '', status: '', tags: [] };

  blog!: Blog;
  id: string | null;

  status: string;
  statuses: string[];

  constructor(private usualRouter: Router, private router: ActivatedRoute, private blogService: ApiClientService) {
    this.id = this.router.snapshot.paramMap.get('id');
    if (this.id) {
      this.blogService.getById(this.id).subscribe(
        data => {
          this.blog = (data as any);
          this.editedBlog = (data as any);
          this.blogForm.setValue({
            date: this.editedBlog.date,
            title: this.editedBlog.title,
            author: this.editedBlog.author,
            description: this.editedBlog.description,
            keywords: this.editedBlog.tags,
            imageUrl: this.editedBlog.image,
            status: this.editedBlog.status,
          });
        },
        //
      );

    }
    this.status = '';
    this.statuses = ['Active', 'Deactivate'];
    this.valid = true;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.keys.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(key: string): void {
    const index = this.keys.indexOf(key);

    if (index >= 0) {
      this.keys.splice(index, 1);
    }
  }

  onChangeTags(event: Event): void {
    if (this.blogForm) {
      this.blogForm.patchValue({
        keywords: this.keys,
      })
    }
  }
  onChangeTitle(event: Event): void {
  }


  onSubmit(form: FormGroup): void {
    this.valid = form.valid;
    if (this.blogForm) {
      this.blog = {
        date: this.blogForm.value.date, title: this.blogForm.value.title, author: this.blogForm.value.author,
        description: this.blogForm.value.description, tags: this.blogForm.value.keywords, image: this.blogForm.value.imageUrl,
        status: this.blogForm.value.status
      };
    }
    if (this.valid) {
      this.editedBlog.title = this.blogForm.value.title;
      this.editedBlog.author = this.blogForm.value.author;
      this.editedBlog.date = this.blogForm.value.date;
      this.editedBlog.description = this.blogForm.value.description;
      this.editedBlog.tags = this.blogForm.value.keywords;
      this.editedBlog.status = this.blogForm.value.status;
      this.editedBlog.image = this.blogForm.value.imageUrl;
      if (this.blog && this.id) {
        this.blogService.updateBlog(this.id, this.editedBlog).subscribe({});
        this.usualRouter.navigate(['home']).then(() => {
          window.location.reload();
        });
      }
    }
  }

  onReset(): void {
    this.keys = [];
  }

  canDeactivate(): Observable<boolean> | boolean {

    if (this.blog.author !== this.blogForm.value.author || this.blog.date !== this.blogForm.value.date ||
        this.blog.description !== this.blogForm.value.description || this.blog.image !== this.blogForm.value.imageUrl
        || this.blog.status !== this.blogForm.value.status
        || this.blog.title !== this.blogForm.value.title) {

      const result = window.confirm('There are unsaved changes! Are you sure?');

       return of(result);
    }
    return true;
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  ngDoCheck(): void {
  }
}
