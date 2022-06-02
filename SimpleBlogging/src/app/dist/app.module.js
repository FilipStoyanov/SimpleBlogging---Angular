"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var blog_component_1 = require("./blog/blog.component");
var form_field_1 = require("@angular/material/form-field");
var chips_1 = require("@angular/material/chips");
var icon_1 = require("@angular/material/icon");
var radio_1 = require("@angular/material/radio");
var button_1 = require("@angular/material/button");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var blog_list_component_1 = require("./blog-list/blog-list.component");
var blog_list_item_component_1 = require("./blog-list/blog-list-item/blog-list-item.component");
var card_1 = require("@angular/material/card");
var last_blogs_component_1 = require("./last-blogs/last-blogs.component");
var edit_blog_component_1 = require("./edit-blog/edit-blog.component");
var blog_view_component_1 = require("./blog-view/blog-view.component");
var angular_editor_1 = require("@kolkov/angular-editor");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                blog_component_1.BlogComponent,
                blog_list_component_1.BlogListComponent,
                blog_list_item_component_1.BlogListItemComponent,
                last_blogs_component_1.LastBlogsComponent,
                edit_blog_component_1.EditBlogComponent,
                blog_view_component_1.BlogViewComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                form_field_1.MatFormFieldModule,
                chips_1.MatChipsModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                radio_1.MatRadioModule,
                button_1.MatButtonModule,
                angular_editor_1.AngularEditorModule,
                icon_1.MatIconModule,
                ng_bootstrap_1.NgbModule,
                http_1.HttpClientModule,
                card_1.MatCardModule,
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
