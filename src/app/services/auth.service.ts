import { Injectable, Inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService as Auth1 } from "angular2-social-login";
import * as globs from '../services/globals';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Injectable()
export class AuthService{

    constructor(
                private router: Router, 
                private http: Http, 
                private toastyService:ToastyService, 
                private toastyConfig: ToastyConfig, 
                public _social: Auth1
              ){                  
        this.toastyConfig.theme = 'material';
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

    socialLogin(userInfo:any){
        return this.http.post(globs.apiLink+'login/socialLogin', userInfo)
        .map((response: Response) => response.json());        
    }

    appToken:any;
    appEmpName:any;
    appUsername:any;
    appProffession:any;
    appUserID:any;
    options:any;

    saveToken(token:any, user:any){
        localStorage.setItem('appToken', token);
        localStorage.setItem('appEmpName', user.emp_name);       
        localStorage.setItem('appUsername', user.username);       
        localStorage.setItem('appProffession', user.proffession);       
        localStorage.setItem('appUserID', user._id);       
    }

    authenticate(){
        if (localStorage.getItem("appToken") === null) {
           this.authFail("Please login first!"); 
        }
        else{
            this.appToken = localStorage.getItem('appToken');

            this.createAuthToken();            

            this.http.post(globs.apiLink+'authenticate', {}, this.options)
                .map((response: Response) => response.json())
                .subscribe(res => { 		 		  		
                    if(res.status=="error"){
                        this.authFail("Invalid Login!");
                    }                    
                });            
        }     
    }

    authStatus(){
        if (localStorage.getItem("appToken") === null) {
            return false;
        }
        else{
            return true;
        }
    }

    getUser(){
        this.appEmpName = localStorage.getItem('appEmpName');
        this.appUsername = localStorage.getItem('appUsername');
        this.appProffession = localStorage.getItem('appProffession');
        this.appUserID = localStorage.getItem('appUserID');

        return {
                'appEmpName' : this.appEmpName,
                'appUsername' : this.appUsername,
                'appProffession' : this.appProffession,
                'appUserID' : this.appUserID
        }
    }

    createAuthToken() {       
        this.options = new RequestOptions({
            headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': this.appToken
            })
        });
    }

    authFail(msg:any=""){
        this.error_alert(msg);
        this.router.navigateByUrl('/LoginComponent');
    }

    logout(){
        this.appUsername = null;
        this.appProffession = null;
        this.appUserID = null;
        this.appToken = null;
        localStorage.clear();        

        //**Social logout**/
        this._social.logout().subscribe(
			(data)=>{
				console.log(data);
			} 
		)

        this.router.navigateByUrl('/LoginComponent');
        this.success_alert('Logout successfull!');
    }

}