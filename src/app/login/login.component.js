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
var router_1 = require("@angular/router");
var ng2_toasty_1 = require("ng2-toasty");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var angular2_social_login_1 = require("angular2-social-login");
var auth_service_1 = require("../services/auth.service");
var globs = require("../services/globals");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(http, router, toastyService, toastyConfig, slimLoadingBarService, auth, _social) {
        this.http = http;
        this.router = router;
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        this.slimLoadingBarService = slimLoadingBarService;
        this.auth = auth;
        this._social = _social;
        this.response_msg = "";
        this.username = "";
        this.password = "";
    }
    LoginComponent.prototype.signIn = function (provider) {
        var _this = this;
        this.sub = this._social.login(provider).subscribe(function (data) {
            console.log(data);
            _this.auth.socialLogin(data).subscribe(function (res) {
                console.log(res);
                if (res.status == "success") {
                    _this.auth.saveToken(res.token, res.user);
                    _this.router.navigateByUrl('/');
                    _this.success_alert(res.msg);
                }
                else {
                    _this.error_alert(res.msg);
                }
            });
        });
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.slimLoadingBarService.complete();
    };
    /*ngOnDestroy(){
      this.sub.unsubscribe();
    }*/
    LoginComponent.prototype.success_alert = function (msg) {
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
    LoginComponent.prototype.error_alert = function (msg) {
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
    LoginComponent.prototype.login = function () {
        var _this = this;
        var data = {
            username: this.username,
            password: this.password
        };
        if (data.username == "") {
            this.error_alert("Username is required!");
            return false;
        }
        if (data.password == "") {
            this.error_alert("Password is required!");
            return false;
        }
        this.http.post(globs.apiLink + 'login/', data)
            .map(function (response) { return response.json(); })
            .subscribe(function (res) {
            console.log(res);
            if (res.status == "success") {
                _this.auth.saveToken(res.token, res.user);
                _this.router.navigateByUrl('/');
                _this.success_alert(res.msg);
            }
            else {
                _this.error_alert(res.msg);
            }
        });
        return false;
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/login/login.component.html',
            styleUrls: ['app/login/login.component.css'],
            providers: [auth_service_1.AuthService, angular2_social_login_1.AuthService]
        }),
        __metadata("design:paramtypes", [http_1.Http, router_1.Router, ng2_toasty_1.ToastyService, ng2_toasty_1.ToastyConfig, ng2_slim_loading_bar_1.SlimLoadingBarService, auth_service_1.AuthService, angular2_social_login_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map