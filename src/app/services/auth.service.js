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
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var angular2_social_login_1 = require("angular2-social-login");
var globs = require("../services/globals");
var ng2_toasty_1 = require("ng2-toasty");
var AuthService = /** @class */ (function () {
    function AuthService(router, http, toastyService, toastyConfig, _social) {
        this.router = router;
        this.http = http;
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        this._social = _social;
        this.toastyConfig.theme = 'material';
    }
    AuthService.prototype.error_alert = function (msg) {
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
    AuthService.prototype.success_alert = function (msg) {
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
    AuthService.prototype.socialLogin = function (userInfo) {
        return this.http.post(globs.apiLink + 'login/socialLogin', userInfo)
            .map(function (response) { return response.json(); });
    };
    AuthService.prototype.saveToken = function (token, user) {
        localStorage.setItem('appToken', token);
        localStorage.setItem('appEmpName', user.emp_name);
        localStorage.setItem('appUsername', user.username);
        localStorage.setItem('appProffession', user.proffession);
        localStorage.setItem('appUserID', user._id);
    };
    AuthService.prototype.authenticate = function () {
        var _this = this;
        if (localStorage.getItem("appToken") === null) {
            this.authFail("Please login first!");
        }
        else {
            this.appToken = localStorage.getItem('appToken');
            this.createAuthToken();
            this.http.post(globs.apiLink + 'authenticate', {}, this.options)
                .map(function (response) { return response.json(); })
                .subscribe(function (res) {
                if (res.status == "error") {
                    _this.authFail("Invalid Login!");
                }
            });
        }
    };
    AuthService.prototype.authStatus = function () {
        if (localStorage.getItem("appToken") === null) {
            return false;
        }
        else {
            return true;
        }
    };
    AuthService.prototype.getUser = function () {
        this.appEmpName = localStorage.getItem('appEmpName');
        this.appUsername = localStorage.getItem('appUsername');
        this.appProffession = localStorage.getItem('appProffession');
        this.appUserID = localStorage.getItem('appUserID');
        return {
            'appEmpName': this.appEmpName,
            'appUsername': this.appUsername,
            'appProffession': this.appProffession,
            'appUserID': this.appUserID
        };
    };
    AuthService.prototype.createAuthToken = function () {
        this.options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Content-Type': 'application/json',
                'authorization': this.appToken
            })
        });
    };
    AuthService.prototype.authFail = function (msg) {
        if (msg === void 0) { msg = ""; }
        this.error_alert(msg);
        this.router.navigateByUrl('/LoginComponent');
    };
    AuthService.prototype.logout = function () {
        this.appUsername = null;
        this.appProffession = null;
        this.appUserID = null;
        this.appToken = null;
        localStorage.clear();
        //**Social logout**/
        this._social.logout().subscribe(function (data) {
            console.log(data);
        });
        this.router.navigateByUrl('/LoginComponent');
        this.success_alert('Logout successfull!');
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router,
            http_1.Http,
            ng2_toasty_1.ToastyService,
            ng2_toasty_1.ToastyConfig,
            angular2_social_login_1.AuthService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map