"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiClientService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var API_BASE_URL = 'http://localhost:9000/api/blogs';
var ApiClientService = /** @class */ (function () {
    function ApiClientService(http) {
        this.http = http;
    }
    ApiClientService.prototype.getAll = function () {
        return this.http.get("" + API_BASE_URL);
    };
    ApiClientService.prototype.getById = function (id) {
        return this.http.get(API_BASE_URL + ("/" + id));
    };
    ApiClientService.prototype.addBlog = function (blog) {
        var body = JSON.stringify(blog);
        var headers = { 'content-type': 'application/json' };
        return this.http.post(API_BASE_URL, body, { headers: headers });
    };
    ApiClientService.prototype.removeBlog = function (blog) {
        return this.http["delete"](API_BASE_URL + ("/" + blog.id));
    };
    ApiClientService.prototype.updateBlog = function (id, blog) {
        var body = JSON.stringify(blog);
        var headers = { 'content-type': 'application/json' };
        if (id) {
            return this.http.put(API_BASE_URL + ("/" + id), body, { headers: headers });
        }
        else {
            return rxjs_1.of();
        }
    };
    ApiClientService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiClientService);
    return ApiClientService;
}());
exports.ApiClientService = ApiClientService;
