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
var ng2_toasty_1 = require("ng2-toasty");
var genFuncService = /** @class */ (function () {
    function genFuncService(toastyService, toastyConfig) {
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        this.toastyConfig.theme = 'material';
    }
    genFuncService.prototype.callback_alert = function (res) {
        if (res === void 0) { res = { status: '', msg: '' }; }
        if (res.status == "success") {
            this.success_alert(res.msg);
        }
        else {
            this.error_alert(res.msg);
        }
    };
    genFuncService.prototype.success_alert = function (msg) {
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
    genFuncService.prototype.error_alert = function (msg) {
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
    genFuncService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ng2_toasty_1.ToastyService, ng2_toasty_1.ToastyConfig])
    ], genFuncService);
    return genFuncService;
}());
exports.genFuncService = genFuncService;
//# sourceMappingURL=genFunc.service.js.map