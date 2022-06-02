"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var blog_component_1 = require("./blog/blog.component");
var blog_list_component_1 = require("./blog-list/blog-list.component");
var last_blogs_component_1 = require("./last-blogs/last-blogs.component");
var edit_blog_component_1 = require("./edit-blog/edit-blog.component");
var blog_view_component_1 = require("./blog-view/blog-view.component");
var can_deactivate_guard_service_1 = require("./services/can-deactivate-guard.service");
var routes = [
    { path: 'add', component: blog_component_1.BlogComponent, canDeactivate: [can_deactivate_guard_service_1.CanDeactivateGuard] },
    { path: 'edit/:id', component: edit_blog_component_1.EditBlogComponent, canDeactivate: [can_deactivate_guard_service_1.CanDeactivateGuard] },
    { path: 'blog/:id', component: blog_view_component_1.BlogViewComponent },
    { path: 'lastblogs', component: last_blogs_component_1.LastBlogsComponent },
    { path: 'home', component: blog_list_component_1.BlogListComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule],
            providers: [
                can_deactivate_guard_service_1.CanDeactivateGuard
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
