"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BlogComponent = void 0;
var core_1 = require("@angular/core");
var keycodes_1 = require("@angular/cdk/keycodes");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var BlogComponent = /** @class */ (function () {
    function BlogComponent(blogService, router) {
        this.blogService = blogService;
        this.router = router;
        this.addOnBlur = true;
        this.separatorKeysCodes = [keycodes_1.ENTER, keycodes_1.COMMA];
        this.keys = [];
        this.blogForm = new forms_1.FormGroup({
            date: new forms_1.FormControl(null),
            title: new forms_1.FormControl(''),
            author: new forms_1.FormControl(''),
            description: new forms_1.FormControl(''),
            keywords: new forms_1.FormControl([]),
            imageUrl: new forms_1.FormControl(''),
            status: new forms_1.FormControl('activate')
        });
        this.editorConfig = {
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
                { "class": 'arial', name: 'Arial' },
                { "class": 'times-new-roman', name: 'Times New Roman' },
                { "class": 'calibri', name: 'Calibri' },
                { "class": 'comic-sans-ms', name: 'Comic Sans MS' }
            ],
            customClasses: [
                {
                    name: 'quote',
                    "class": 'quote'
                },
                {
                    name: 'redText',
                    "class": 'redText'
                },
                {
                    name: 'titleText',
                    "class": 'titleText',
                    tag: 'h1'
                },
            ]
        };
        this.status = '';
        this.statuses = ['Active', 'Deactivate'];
        this.valid = true;
    }
    BlogComponent.prototype.add = function (event) {
        var value = (event.value || '').trim();
        // Add our fruit
        if (value) {
            this.keys.push(value);
        }
        // Clear the input value
        event.chipInput.clear();
    };
    BlogComponent.prototype.remove = function (value) {
        var index = this.keys.indexOf(value);
        if (index >= 0) {
            this.keys.splice(index, 1);
        }
    };
    BlogComponent.prototype.onChangeTags = function (event) {
        console.log(this.keys);
        this.blogForm.patchValue({
            keywords: this.keys
        });
    };
    BlogComponent.prototype.onChangeTitle = function (event) {
        console.log(this.blogForm.value);
    };
    BlogComponent.prototype.onSubmit = function (form) {
        this.valid = form.valid;
        this.blog = { date: this.blogForm.value.date, title: this.blogForm.value.title, author: this.blogForm.value.author,
            description: this.blogForm.value.description, tags: this.blogForm.value.keywords, image: this.blogForm.value.imageUrl,
            status: this.blogForm.value.status };
        if (this.valid) {
            this.blogService.addBlog(this.blog).subscribe({});
            this.router.navigate(['home']).then(function () { return window.location.reload(); });
        }
    };
    BlogComponent.prototype.onReset = function () {
        this.keys = [];
    };
    BlogComponent.prototype.ngOnInit = function () {
    };
    BlogComponent.prototype.ngOnChanges = function () {
    };
    BlogComponent.prototype.canDeactivate = function () {
        console.log('deactivate');
        if (this.blogForm.value.author !== '' || this.blogForm.value.title !== '' || this.blogForm.value.description !== ''
            || this.blogForm.value.imageUrl !== '' || this.blogForm.value.status !== 'activate') {
            var result = window.confirm('There are unsaved changes! Are you sure?');
            return rxjs_1.of(result);
        }
        return true;
    };
    BlogComponent = __decorate([
        core_1.Component({
            selector: 'app-blog',
            templateUrl: './blog.component.html',
            styleUrls: ['./blog.component.scss']
        })
    ], BlogComponent);
    return BlogComponent;
}());
exports.BlogComponent = BlogComponent;
