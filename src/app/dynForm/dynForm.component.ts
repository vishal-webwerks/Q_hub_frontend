import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {IMyDpOptions} from 'mydatepicker';
import { genFuncService } from '../services/genFunc.service';
import { studentService } from '../services/student.service';
import * as globs from '../services/globals';
import { AuthService } from '../services/auth.service';


@Component({
    selector: 'my-app',
    templateUrl: 'app/dynForm/dynForm.html',
    styleUrls: ['app/dynForm/dynForm.css'],
    providers:[genFuncService, studentService, AuthService]
})

export class dynFormComponent {

    studData: any;
    init_stud_data(){
        this.studData = {
            _id:"",
            name:"",
            highest_education:"",
            birth_date:"",
            email_id:"",
            address:"",
            skills: [this.createSkills()],        
        };
    }    

    studsData:any[];
    dynFrm: FormGroup;  
    skills: FormArray;
    toggle_class:String = "off";
    toggle_modal_cl:String = "off";
    myData:any = "";
    educations_list:any[] = ['MCS','BCS','BCA','MCA','B.E'];

    public myDatePickerOptions: IMyDpOptions;

    constructor(private slimLoadingBarService: SlimLoadingBarService, private fb: FormBuilder, private _genFuncService:genFuncService, private _studentService:studentService, private auth:AuthService){ 
        this.auth.authenticate();
    }

    ngOnInit() : void {

        this.init_stud_data();

        this.slimLoadingBarService.complete();
        
        
        for(var i=0; i<this.studData.skills; i++){
            this.createSkills(this.studData.skills.skill, this.studData.skills.desc);
        }
        this.formInit();
        this.getStuds();

    }


    //**===================================Dynamic Form Ops===================================**/
    formInit(){        

        this.dynFrm = this.fb.group({
            '_id': [this.studData._id],
            'name': [this.studData.name, [
                            Validators.required,
                            Validators.minLength(4)
                         ]
                    ],
            'highest_education': [this.studData.highest_education, Validators.required],
            'birth_date': [this.studData.birth_date],
            'email_id': [this.studData.email_id, Validators.required],
            'address': [this.studData.address, Validators.required],
            'skills': this.fb.array(this.studData.skills)
        }); 

        console.log(this.dynFrm);
    }    

    createSkills(skill:any='', desc:any=''): FormGroup {
        return this.fb.group({
            'skill' : [skill, Validators.required],
            'desc' : [desc, Validators.required]
        })
    }

    deleteSkill(offset:number){
        const control = <FormArray>this.dynFrm.controls['skills'];
        control.removeAt(offset);
        console.log(this.skills);
    }

    addSkill(): void{
        this.skills = this.dynFrm.get('skills') as FormArray;
        this.skills.push(this.createSkills());
    }

    //**===================================Event Ops===================================**/
    newStudForm(){
        this.init_stud_data();
        this.formInit();
        this.toggle_panel();
    }  

    toggle_panel(){
        if(this.toggle_class=="off"){
            this.toggle_class = "on";
        }
        else{
            this.toggle_class = "off";
        }
    }

    toggle_modal(){
        if(this.toggle_modal_cl=="off"){
            this.toggle_modal_cl = "on";
        }
        else{
            this.toggle_modal_cl = "off";
        }
    }

    //**===================================Crud Ops===================================**/
    getStuds(){
        this._studentService.getStuds()
        .subscribe(response => {                                
            this.studsData = response;
        });
    }

    onSubmit(frmData:any){
        if(frmData._id==""){
            this._studentService.save(frmData)
                                .subscribe(response => {                                
                                    this._genFuncService.callback_alert(response);
                                    this.getStuds();
                                });
        }   
        else{
            this._studentService.update(frmData)
                                .subscribe(response => {                                
                                    this._genFuncService.callback_alert(response);
                                    this.getStuds();                                    
                                });
        }
        this.toggle_panel();
        
    }

    getStud(studId:any, info_type:String){
        this._studentService.getOne(studId)
            .subscribe(response => {  
                this.setModel(response);                
                if(info_type=="edit"){
                    this.toggle_panel();
                }
                else{
                    this.toggle_modal();
                }
                
            });        
    }

    setModel(obj:any){        
        
        let skills_arr: any[] = [];
        
        for(var i=0; i<obj.skills.length; i++){
            skills_arr.push(this.createSkills(obj.skills[i].skill, obj.skills[i].desc));
        }

        this.studData = {
            _id:obj._id,
            name:obj.name,
            highest_education:obj.highest_education,
            birth_date:obj.birth_date,
            email_id:obj.email_id,
            address:obj.address,
            skills: skills_arr                        
        };        
        this.formInit();
    }

}