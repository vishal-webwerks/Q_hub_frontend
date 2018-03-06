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
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var genFunc_service_1 = require("../../services/genFunc.service");
var globs = require("../../services/globals");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(http, slimLoadingBarService, _genFuncService) {
        this.http = http;
        this.slimLoadingBarService = slimLoadingBarService;
        this._genFuncService = _genFuncService;
        this.name = 'Register Component';
        this.response_msg = "";
        this.emp_name = "";
        this.proffession = "";
        this.address = "";
        this.username = "";
        this.password = "";
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.slimLoadingBarService.complete();
    };
    RegisterComponent.prototype.save_emp = function () {
        var _this = this;
        var data = {
            emp_name: this.emp_name,
            proffession: this.proffession,
            address: this.address,
            username: this.username,
            password: this.password
        };
        if (data.emp_name == "") {
            this._genFuncService.error_alert("Employee name is required!");
            return false;
        }
        if (data.proffession == "") {
            this._genFuncService.error_alert("Profession is required!");
            return false;
        }
        if (data.address == "") {
            this._genFuncService.error_alert("Address is required!");
            return false;
        }
        if (data.username == "") {
            this._genFuncService.error_alert("Username is required!");
            return false;
        }
        if (data.password == "") {
            this._genFuncService.error_alert("Password is required!");
            return false;
        }
        this.http.post(globs.apiLink + 'employee/save_emp', data)
            .map(function (response) { return response.json(); })
            .subscribe(function (res) {
            if (res.status == "success") {
                _this.emp_name = _this.proffession = _this.address = _this.username = _this.password = "";
                _this._genFuncService.success_alert(res.msg);
            }
            else {
                _this._genFuncService.error_alert(res.msg);
            }
        });
        return false;
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/employee/register/register.component.html',
            styleUrls: ['app/employee/register/register.component.css'],
            providers: [genFunc_service_1.genFuncService]
        }),
        __metadata("design:paramtypes", [http_1.Http, ng2_slim_loading_bar_1.SlimLoadingBarService, genFunc_service_1.genFuncService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map