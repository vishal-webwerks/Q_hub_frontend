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
var forms_1 = require("@angular/forms");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var genFunc_service_1 = require("../services/genFunc.service");
var student_service_1 = require("../services/student.service");
var auth_service_1 = require("../services/auth.service");
var dynFormComponent = /** @class */ (function () {
    function dynFormComponent(slimLoadingBarService, fb, _genFuncService, _studentService, auth) {
        this.slimLoadingBarService = slimLoadingBarService;
        this.fb = fb;
        this._genFuncService = _genFuncService;
        this._studentService = _studentService;
        this.auth = auth;
        this.toggle_class = "off";
        this.toggle_modal_cl = "off";
        this.myData = "";
        this.educations_list = ['MCS', 'BCS', 'BCA', 'MCA', 'B.E'];
        this.auth.authenticate();
    }
    dynFormComponent.prototype.init_stud_data = function () {
        this.studData = {
            _id: "",
            name: "",
            highest_education: "",
            birth_date: "",
            email_id: "",
            address: "",
            skills: [this.createSkills()],
        };
    };
    dynFormComponent.prototype.ngOnInit = function () {
        this.init_stud_data();
        this.slimLoadingBarService.complete();
        for (var i = 0; i < this.studData.skills; i++) {
            this.createSkills(this.studData.skills.skill, this.studData.skills.desc);
        }
        this.formInit();
        this.getStuds();
    };
    //**===================================Dynamic Form Ops===================================**/
    dynFormComponent.prototype.formInit = function () {
        this.dynFrm = this.fb.group({
            '_id': [this.studData._id],
            'name': [this.studData.name, [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(4)
                ]
            ],
            'highest_education': [this.studData.highest_education, forms_1.Validators.required],
            'birth_date': [this.studData.birth_date],
            'email_id': [this.studData.email_id, forms_1.Validators.required],
            'address': [this.studData.address, forms_1.Validators.required],
            'skills': this.fb.array(this.studData.skills)
        });
        console.log(this.dynFrm);
    };
    dynFormComponent.prototype.createSkills = function (skill, desc) {
        if (skill === void 0) { skill = ''; }
        if (desc === void 0) { desc = ''; }
        return this.fb.group({
            'skill': [skill, forms_1.Validators.required],
            'desc': [desc, forms_1.Validators.required]
        });
    };
    dynFormComponent.prototype.deleteSkill = function (offset) {
        var control = this.dynFrm.controls['skills'];
        control.removeAt(offset);
        console.log(this.skills);
    };
    dynFormComponent.prototype.addSkill = function () {
        this.skills = this.dynFrm.get('skills');
        this.skills.push(this.createSkills());
    };
    //**===================================Event Ops===================================**/
    dynFormComponent.prototype.newStudForm = function () {
        this.init_stud_data();
        this.formInit();
        this.toggle_panel();
    };
    dynFormComponent.prototype.toggle_panel = function () {
        if (this.toggle_class == "off") {
            this.toggle_class = "on";
        }
        else {
            this.toggle_class = "off";
        }
    };
    dynFormComponent.prototype.toggle_modal = function () {
        if (this.toggle_modal_cl == "off") {
            this.toggle_modal_cl = "on";
        }
        else {
            this.toggle_modal_cl = "off";
        }
    };
    //**===================================Crud Ops===================================**/
    dynFormComponent.prototype.getStuds = function () {
        var _this = this;
        this._studentService.getStuds()
            .subscribe(function (response) {
            _this.studsData = response;
        });
    };
    dynFormComponent.prototype.onSubmit = function (frmData) {
        var _this = this;
        if (frmData._id == "") {
            this._studentService.save(frmData)
                .subscribe(function (response) {
                _this._genFuncService.callback_alert(response);
                _this.getStuds();
            });
        }
        else {
            this._studentService.update(frmData)
                .subscribe(function (response) {
                _this._genFuncService.callback_alert(response);
                _this.getStuds();
            });
        }
        this.toggle_panel();
    };
    dynFormComponent.prototype.getStud = function (studId, info_type) {
        var _this = this;
        this._studentService.getOne(studId)
            .subscribe(function (response) {
            _this.setModel(response);
            if (info_type == "edit") {
                _this.toggle_panel();
            }
            else {
                _this.toggle_modal();
            }
        });
    };
    dynFormComponent.prototype.setModel = function (obj) {
        var skills_arr = [];
        for (var i = 0; i < obj.skills.length; i++) {
            skills_arr.push(this.createSkills(obj.skills[i].skill, obj.skills[i].desc));
        }
        this.studData = {
            _id: obj._id,
            name: obj.name,
            highest_education: obj.highest_education,
            birth_date: obj.birth_date,
            email_id: obj.email_id,
            address: obj.address,
            skills: skills_arr
        };
        this.formInit();
    };
    dynFormComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/dynForm/dynForm.html',
            styleUrls: ['app/dynForm/dynForm.css'],
            providers: [genFunc_service_1.genFuncService, student_service_1.studentService, auth_service_1.AuthService]
        }),
        __metadata("design:paramtypes", [ng2_slim_loading_bar_1.SlimLoadingBarService, forms_1.FormBuilder, genFunc_service_1.genFuncService, student_service_1.studentService, auth_service_1.AuthService])
    ], dynFormComponent);
    return dynFormComponent;
}());
exports.dynFormComponent = dynFormComponent;
//# sourceMappingURL=dynForm.component.js.map