"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BlogViewComponent = void 0;
var core_1 = require("@angular/core");
var BlogViewComponent = /** @class */ (function () {
    function BlogViewComponent(router, blogService) {
        var _this = this;
        this.router = router;
        this.blogService = blogService;
        this.id = this.router.snapshot.paramMap.get("id");
        this.data = { date: new Date(), status: '', image: '' };
        if (this.id) {
            this.blogService.getById(this.id).subscribe(function (result) {
                _this.data = result;
            });
        }
    }
    BlogViewComponent.prototype.ngOnInit = function () {
    };
    BlogViewComponent = __decorate([
        core_1.Component({
            selector: 'app-blog-view',
            templateUrl: './blog-view.component.html',
            styleUrls: ['./blog-view.component.scss']
        })
    ], BlogViewComponent);
    return BlogViewComponent;
}());
exports.BlogViewComponent = BlogViewComponent;
