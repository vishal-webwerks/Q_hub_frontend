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
var EmployeeService = /** @class */ (function () {
    function EmployeeService(_http) {
        this._http = _http;
        this._employeeurl = 'app/services/employee.json';
    }
    EmployeeService.prototype.getemployees = function () {
        return this._http.get(globs.apiLink + 'employee/get_emp_list')
            .map(function (response) { return response.json(); });
        //.do(data => console.log(JSON.stringify(data)));
    };
    EmployeeService.prototype.getEmpCount = function () {
        return this._http.get(globs.apiLink + 'employee/get_emp_count')
            .map(function (response) { return response.json(); });
        //.do(data => console.log(JSON.stringify(data)));
    };
    EmployeeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], EmployeeService);
    return EmployeeService;
}());
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=emp.service.js.map