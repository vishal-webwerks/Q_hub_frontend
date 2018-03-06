import { Injectable } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Injectable()
export class genFuncService{

    constructor( private toastyService:ToastyService, private toastyConfig: ToastyConfig){
        this.toastyConfig.theme = 'material';
    }

    callback_alert(res= {status:'', msg:''}){

        if(res.status=="success"){
            this.success_alert(res.msg);
        }
        else{
            this.error_alert(res.msg);
        }
        
    }

    success_alert(msg=""){
        
        var toastOptions:ToastOptions = {
            title: "Success",
            msg: msg,
            showClose: true,
            timeout: 5000,
            theme: 'default'            
        };
        this.toastyService.success(toastOptions);
    }
    error_alert(msg=""){
            var toastOptions:ToastOptions = {
            title: "Error",
            msg: msg,
            showClose: true,
            timeout: 5000,
            theme: 'default'            
        };
        this.toastyService.error(toastOptions);
    }
    
}