"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var globs = require("./globals");
var studentService = /** @class */ (function () {
    function studentService(_http) {
        this._http = _http;
    }
    studentService.prototype.save = function (frmData) {
        return this._http.post(globs.apiLink + 'student/save', frmData)
            .map(function (response) { return response.json(); });
    };
    studentService.prototype.update = function (frmData) {
        return this._http.post(globs.apiLink + 'student/update', frmData)
            .map(function (response) { return response.json(); });
    };
    studentService.prototype.getStuds = function () {
        return this._http.get(globs.apiLink + 'student/get')
            .map(function (response) { return response.json(); });
    };
    studentService.prototype.getStudCount = function () {
        return this._http.get(globs.apiLink + 'student/getCount')
            .map(function (response) { return response.json(); });
    };
    studentService.prototype.getOne = function (studId) {
        return this._http.post(globs.apiLink + 'student/getOne', { studId: studId })
            .map(function (response) { return response.json(); });
    };
    studentService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], studentService);
    return studentService;
}());
exports.studentService = studentService;
//# sourceMappingURL=student.service.js.map