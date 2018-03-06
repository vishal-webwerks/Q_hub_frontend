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
var emp_service_1 = require("../../services/emp.service");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var $ = require('https://code.jquery.com/jquery-3.2.1.min.js');
var ng2_toasty_1 = require("ng2-toasty");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var auth_service_1 = require("../../services/auth.service");
var globs = require("../../services/globals");
var ListComponent = /** @class */ (function () {
    function ListComponent(_employees, http, toastyService, toastyConfig, slimLoadingBarService, auth) {
        this._employees = _employees;
        this.http = http;
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        this.slimLoadingBarService = slimLoadingBarService;
        this.auth = auth;
        this.response_msg = "";
        this.thumb_display = true;
        this.emp_id = "";
        this.emp_name = "";
        this.proffession = "";
        this.address = "";
        this.username = "";
        this.toastyConfig.theme = 'material';
        this.auth.authenticate();
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._employees.getemployees()
            .subscribe(function (employees) { return _this.employees = employees; });
        this.slimLoadingBarService.complete();
    };
    ListComponent.prototype.ngAfterViewInit = function () {
        //$('#update_modal').modal('show');
    };
    ListComponent.prototype.success_alert = function (msg) {
        if (msg === void 0) { msg = ""; }
        var toastOptions = {
            title: "Success",
            msg: msg,
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        this.toastyService.success(toastOptions);
    };
    ListComponent.prototype.error_alert = function (msg) {
        if (msg === void 0) { msg = ""; }
        var toastOptions = {
            title: "Error",
            msg: msg,
            showClose: true,
            timeout: 5000,
            theme: 'default'
        };
        this.toastyService.error(toastOptions);
    };
    ListComponent.prototype.show_modal = function () {
        $('#update_modal').addClass('show').css('display', 'block');
    };
    ListComponent.prototype.hide_modal = function () {
        $('#update_modal').removeClass('show').css('display', 'none');
    };
    ListComponent.prototype.getEmpInfo = function (emp_id) {
        var _this = this;
        this.emp_id = emp_id;
        this.http.post(globs.apiLink + 'employee/get_emp_info', { emp_id: emp_id })
            .map(function (response) { return response.json(); })
            .subscribe(function (res) {
            _this.emp_name = res.emp_name;
            _this.proffession = res.proffession;
            _this.address = res.address;
            _this.username = res.username;
            //$('#update_modal').modal('show');
            _this.show_modal();
        });
    };
    ListComponent.prototype.update_emp = function () {
        var _this = this;
        var data = {
            emp_id: this.emp_id,
            emp_name: this.emp_name,
            proffession: this.proffession,
            address: this.address,
            username: this.username
        };
        if (data.emp_name == "" || data.emp_name == undefined) {
            this.error_alert("Employee name is required!");
            return false;
        }
        if (data.proffession == "" || data.proffession == undefined) {
            this.error_alert("Profession is required!");
            return false;
        }
        if (data.address == "" || data.address == undefined) {
            this.error_alert("Address is required!");
            return false;
        }
        if (data.username == "" || data.username == undefined) {
            this.error_alert("Username is required!");
            return false;
        }
        this.http.post(globs.apiLink + 'employee/update_emp', data)
            .map(function (response) { return response.json(); })
            .subscribe(function (res) {
            if (res.status == "success") {
                //this.emp_name = this.proffession = this.address = "";	
                _this.success_alert(res.msg);
            }
            else {
                _this.error_alert(res.msg);
            }
            //$('#update_modal').modal('hide');
            //this.hide_modal();
            _this.ngOnInit();
        });
        return false;
    };
    ListComponent.prototype.listingState = function (state) {
        this.thumb_display = state;
    };
    ListComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/employee/list/list.component.html',
            styleUrls: ['app/employee/list/list.component.css'],
            providers: [auth_service_1.AuthService, emp_service_1.EmployeeService]
        }),
        __metadata("design:paramtypes", [emp_service_1.EmployeeService, http_1.Http, ng2_toasty_1.ToastyService, ng2_toasty_1.ToastyConfig, ng2_slim_loading_bar_1.SlimLoadingBarService, auth_service_1.AuthService])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map