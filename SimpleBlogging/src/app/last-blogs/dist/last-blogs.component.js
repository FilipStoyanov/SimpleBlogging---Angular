"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LastBlogsComponent = void 0;
var core_1 = require("@angular/core");
var LastBlogsComponent = /** @class */ (function () {
    function LastBlogsComponent(router, blogService) {
        var _this = this;
        this.router = router;
        this.blogService = blogService;
        this.blogs = [];
        this.filteredBlogs = [];
        this.blogService.getAll().subscribe(function (data) {
            _this.blogs = data.sort(function (a, b) { return new Date(b.date).setHours(0, 0, 0, 0) - new Date(a.date).setHours(0, 0, 0, 0); }).slice(0, 4);
            _this.filteredBlogs = data.sort(function (a, b) { return new Date(b.date).setHours(0, 0, 0, 0) - new Date(a.date).setHours(0, 0, 0, 0); }).slice(0, 4);
        });
    }
    LastBlogsComponent.prototype.activateFilter = function () {
        this.filteredBlogs = this.blogs.filter(function (obj) { return obj.status === 'activate'; });
    };
    LastBlogsComponent.prototype.deactivateFilter = function () {
        this.filteredBlogs = this.blogs.filter(function (obj) { return obj.status === 'deactivate'; });
    };
    LastBlogsComponent.prototype.clearFilters = function () {
        this.filteredBlogs = this.blogs;
    };
    LastBlogsComponent.prototype.ngOnInit = function () {
    };
    LastBlogsComponent = __decorate([
        core_1.Component({
            selector: 'app-last-blogs',
            templateUrl: './last-blogs.component.html',
            styleUrls: ['./last-blogs.component.scss']
        })
    ], LastBlogsComponent);
    return LastBlogsComponent;
}());
exports.LastBlogsComponent = LastBlogsComponent;
