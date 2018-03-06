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
var ng2_toasty_1 = require("ng2-toasty");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var auth_service_1 = require("../services/auth.service");
var DefaultComponenet = /** @class */ (function () {
    function DefaultComponenet(_employees, toastyService, toastyConfig, slimLoadingBarService, auth, _students) {
        this._employees = _employees;
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        this.slimLoadingBarService = slimLoadingBarService;
        this.auth = auth;
        this._students = _students;
        this.page_title = "Dashboard";
        this.empCount = 0;
        this.proffCount = 0;
        this.studCount = 0;
        this.auth.authenticate();
        this.toastyConfig.theme = 'material';
    }
    DefaultComponenet.prototype.ngOnInit = function () {
        var _this = this;
        this._employees
            .getEmpCount()
            .subscribe(function (employees) {
            _this.empCount = employees.empCount;
            _this.proffCount = employees.proffCount;
        });
        this._students
            .getStudCount()
            .subscribe(function (students) {
            _this.studCount = students.studCount;
        });
        this.slimLoadingBarService.complete();
    };
    DefaultComponenet.prototype.addToast = function () {
        // Just add default Toast with title only
        this.toastyService.default('Hi there');
        // Or create the instance of ToastOptions
        var toastOptions = {
            title: "My title",
            msg: "The message",
            showClose: true,
            timeout: 5000,
            theme: 'default',
            onAdd: function (toast) {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function (toast) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        // Add see all possible types in one shot
        this.toastyService.info(toastOptions);
        this.toastyService.success(toastOptions);
        this.toastyService.wait(toastOptions);
        this.toastyService.error(toastOptions);
        this.toastyService.warning(toastOptions);
    };
    DefaultComponenet = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/default/default.component.html',
            styleUrls: ['app/default/default.component.css'],
            providers: [emp_service_1.EmployeeService, student_service_1.studentService, auth_service_1.AuthService]
        }),
        __metadata("design:paramtypes", [emp_service_1.EmployeeService, ng2_toasty_1.ToastyService, ng2_toasty_1.ToastyConfig, ng2_slim_loading_bar_1.SlimLoadingBarService, auth_service_1.AuthService, student_service_1.studentService])
    ], DefaultComponenet);
    return DefaultComponenet;
}());
exports.DefaultComponenet = DefaultComponenet;
//# sourceMappingURL=default.component.js.map