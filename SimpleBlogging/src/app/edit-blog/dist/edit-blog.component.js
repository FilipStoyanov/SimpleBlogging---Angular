"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditBlogComponent = void 0;
var core_1 = require("@angular/core");
var keycodes_1 = require("@angular/cdk/keycodes");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var EditBlogComponent = /** @class */ (function () {
    function EditBlogComponent(usualRouter, router, blogService) {
        var _this = this;
        this.usualRouter = usualRouter;
        this.router = router;
        this.blogService = blogService;
        this.addOnBlur = true;
        this.separatorKeysCodes = [keycodes_1.ENTER, keycodes_1.COMMA];
        this.keys = [];
        this.blogForm = new forms_1.FormGroup({
            date: new forms_1.FormControl({}),
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
        this.editedBlog = { id: 0, date: new Date(0), title: '', author: '', image: '', description: '', status: '', tags: [] };
        this.id = this.router.snapshot.paramMap.get('id');
        if (this.id) {
            this.blogService.getById(this.id).subscribe(function (data) {
                _this.blog = data;
                _this.editedBlog = data;
                _this.blogForm.setValue({
                    date: _this.editedBlog.date,
                    title: _this.editedBlog.title,
                    author: _this.editedBlog.author,
                    description: _this.editedBlog.description,
                    keywords: _this.editedBlog.tags,
                    imageUrl: _this.editedBlog.image,
                    status: _this.editedBlog.status
                });
            });
        }
        this.status = '';
        this.statuses = ['Active', 'Deactivate'];
        this.valid = true;
    }
    EditBlogComponent.prototype.add = function (event) {
        var value = (event.value || '').trim();
        // Add our fruit
        if (value) {
            this.keys.push(value);
        }
        // Clear the input value
        event.chipInput.clear();
    };
    EditBlogComponent.prototype.remove = function (key) {
        var index = this.keys.indexOf(key);
        if (index >= 0) {
            this.keys.splice(index, 1);
        }
    };
    EditBlogComponent.prototype.onChangeTags = function (event) {
        if (this.blogForm) {
            this.blogForm.patchValue({
                keywords: this.keys
            });
        }
    };
    EditBlogComponent.prototype.onChangeTitle = function (event) {
    };
    EditBlogComponent.prototype.onSubmit = function (form) {
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
                this.usualRouter.navigate(['home']).then(function () {
                    window.location.reload();
                });
            }
        }
    };
    EditBlogComponent.prototype.onReset = function () {
        this.keys = [];
    };
    EditBlogComponent.prototype.canDeactivate = function () {
        if (this.blog.author !== this.blogForm.value.author || this.blog.date !== this.blogForm.value.date ||
            this.blog.description !== this.blogForm.value.description || this.blog.image !== this.blogForm.value.imageUrl
            || this.blog.status !== this.blogForm.value.status
            || this.blog.title !== this.blogForm.value.title) {
            var result = window.confirm('There are unsaved changes! Are you sure?');
            return rxjs_1.of(result);
        }
        return true;
    };
    EditBlogComponent.prototype.ngOnInit = function () {
    };
    EditBlogComponent.prototype.ngOnChanges = function () {
    };
    EditBlogComponent.prototype.ngDoCheck = function () {
    };
    EditBlogComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-blog',
            templateUrl: './edit-blog.component.html',
            styleUrls: ['./edit-blog.component.scss']
        })
    ], EditBlogComponent);
    return EditBlogComponent;
}());
exports.EditBlogComponent = EditBlogComponent;
