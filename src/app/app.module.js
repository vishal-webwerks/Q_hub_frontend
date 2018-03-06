"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var ng2_toasty_1 = require("ng2-toasty");
var angular2_datatable_1 = require("angular2-datatable");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var mydatepicker_1 = require("mydatepicker");
var auto_complete_1 = require("@ngui/auto-complete");
var ng2_charts_1 = require("ng2-charts");
var angular2_social_login_1 = require("angular2-social-login");
var app_component_1 = require("./app.component");
var default_component_1 = require("./default/default.component");
var register_component_1 = require("./employee/register/register.component");
var list_component_1 = require("./employee/list/list.component");
var login_component_1 = require("./login/login.component");
var pageNotFound_component_1 = require("./page_not_found/pageNotFound.component");
var header_component_1 = require("./layouts/header/header.component");
var footer_component_1 = require("./layouts/footer/footer.component");
var dynForm_component_1 = require("./dynForm/dynForm.component");
var charts_component_1 = require("./charts/charts.component");
var truncate_1 = require("./pipes/truncate");
var providers = {
    "google": {
        "clientId": "219140989334-rqgtemctq5h10njd4n8qdlruu6pqaojb.apps.googleusercontent.com"
    },
};
var appRoutes = [
    { path: '', component: default_component_1.DefaultComponenet },
    { path: 'RegisterComponent', component: register_component_1.RegisterComponent },
    { path: 'ListComponent', component: list_component_1.ListComponent },
    { path: 'LoginComponent', component: login_component_1.LoginComponent },
    { path: 'dynForm', component: dynForm_component_1.dynFormComponent },
    { path: 'charts', component: charts_component_1.ChartsComponent },
    { path: '**', component: pageNotFound_component_1.PageNotFoundComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(appRoutes),
                http_1.HttpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng2_toasty_1.ToastyModule.forRoot(),
                angular2_datatable_1.DataTableModule,
                ng2_slim_loading_bar_1.SlimLoadingBarModule.forRoot(),
                mydatepicker_1.MyDatePickerModule,
                auto_complete_1.NguiAutoCompleteModule,
                ng2_charts_1.ChartsModule,
                angular2_social_login_1.Angular2SocialLoginModule
            ],
            declarations: [
                app_component_1.AppComponent,
                default_component_1.DefaultComponenet,
                register_component_1.RegisterComponent,
                list_component_1.ListComponent,
                pageNotFound_component_1.PageNotFoundComponent,
                login_component_1.LoginComponent,
                header_component_1.AppHeaderComponent,
                footer_component_1.AppFooterComponent,
                dynForm_component_1.dynFormComponent,
                truncate_1.TruncatePipe,
                charts_component_1.ChartsComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
angular2_social_login_1.Angular2SocialLoginModule.loadProvidersScripts(providers);
//# sourceMappingURL=app.module.js.map