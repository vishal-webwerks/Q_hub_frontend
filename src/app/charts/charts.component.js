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
var emp_service_1 = require("../services/emp.service");
var student_service_1 = require("../services/student.service");
var auth_service_1 = require("../services/auth.service");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var ChartsComponent = /** @class */ (function () {
    function ChartsComponent(_employees, auth, _students, slimLoadingBarService) {
        this._employees = _employees;
        this.auth = auth;
        this._students = _students;
        this.slimLoadingBarService = slimLoadingBarService;
        this.doughnutChartLabels = ['Students', 'Employees'];
        this.doughnutChartData = [100, 100];
        this.doughnutChartType = 'doughnut';
        this.auth.authenticate();
    }
    ChartsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._employees
            .getEmpCount()
            .subscribe(function (employees) {
            _this.doughnutChartData[1] = employees.empCount;
        });
        this._students
            .getStudCount()
            .subscribe(function (students) {
            _this.doughnutChartData[0] = students.studCount;
        });
        this.slimLoadingBarService.complete();
    };
    ChartsComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    ChartsComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    ChartsComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/charts/charts.component.html',
            providers: [emp_service_1.EmployeeService, student_service_1.studentService, auth_service_1.AuthService]
        }),
        __metadata("design:paramtypes", [emp_service_1.EmployeeService, auth_service_1.AuthService, student_service_1.studentService, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], ChartsComponent);
    return ChartsComponent;
}());
exports.ChartsComponent = ChartsComponent;
//# sourceMappingURL=charts.component.js.map