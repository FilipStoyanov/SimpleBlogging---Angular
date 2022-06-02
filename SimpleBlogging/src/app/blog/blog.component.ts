import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
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
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnChanges {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  keys: string[] = [];

  valid: boolean;

  blogForm = new FormGroup({
     date: new FormControl(null),
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

  blog: Blog | undefined;

  status: string;
  statuses: string[];

  constructor(private blogService: ApiClientService, private router: Router) {
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

  remove(value:string): void {
    const index = this.keys.indexOf(value);

    if (index >= 0) {
      this.keys.splice(index, 1);
    }
  }

  onChangeTags(event: Event): void {
    console.log(this.keys);
    this.blogForm.patchValue({
      keywords: this.keys,
    })
  }
  onChangeTitle(event: Event): void {
    console.log(this.blogForm.value);
  }

  onSubmit(form: FormGroup): void{
    this.valid = form.valid;
    this.blog = {date: this.blogForm.value.date, title: this.blogForm.value.title, author: this.blogForm.value.author,
    description: this.blogForm.value.description, tags: this.blogForm.value.keywords, image: this.blogForm.value.imageUrl,
    status: this.blogForm.value.status};
    if(this.valid){
      this.blogService.addBlog(this.blog).subscribe({});
      this.router.navigate(['home']).then(() => window.location.reload());
    }
  }

  onReset(): void {
    this.keys = [];
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  canDeactivate(): Observable<boolean> | boolean {
    console.log('deactivate');
    if (this.blogForm.value.author !== '' || this.blogForm.value.title !== '' || this.blogForm.value.description !== ''
        || this.blogForm.value.imageUrl !== '' || this.blogForm.value.status !== 'activate') {

      const result = window.confirm('There are unsaved changes! Are you sure?');

       return of(result);
    }
    return true;
  }
}
