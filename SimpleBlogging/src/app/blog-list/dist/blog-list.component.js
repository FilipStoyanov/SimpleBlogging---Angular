"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BlogListComponent = void 0;
var core_1 = require("@angular/core");
var BlogListComponent = /** @class */ (function () {
    function BlogListComponent(blogService) {
        var _this = this;
        this.blogService = blogService;
        this.blogs = [];
        this.showAlert = false;
        this.blogService.getAll().subscribe(function (data) { return _this.blogs = data; });
    }
    BlogListComponent.prototype.removeBlog = function (blog) {
        var _this = this;
        var ind = this.blogs.indexOf(blog);
        this.blogs.splice(ind, 1);
        this.showAlert = true;
        setTimeout(function () {
            _this.showAlert = false;
        }, 3000);
    };
    BlogListComponent.prototype.ngOnInit = function () {
    };
    BlogListComponent = __decorate([
        core_1.Component({
            selector: 'app-blog-list',
            templateUrl: './blog-list.component.html',
            styleUrls: ['./blog-list.component.scss']
        })
    ], BlogListComponent);
    return BlogListComponent;
}());
exports.BlogListComponent = BlogListComponent;
