import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, RouterModule, Routes } from '@angular/router';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { AuthService as Auth1 } from "angular2-social-login";
import { AuthService } from '../services/auth.service';
import * as globs from '../services/globals';

@Component({
	selector:'my-app',
	templateUrl:'app/login/login.component.html',
	styleUrls:['app/login/login.component.css'],
	providers:[AuthService, Auth1]
})

export class LoginComponent{ 

	constructor(private http: Http, private router: Router, private toastyService:ToastyService, private toastyConfig: ToastyConfig, private slimLoadingBarService: SlimLoadingBarService, private auth:AuthService, public _social: Auth1){

	}
	

	signIn(provider:string){
		this.sub = this._social.login(provider).subscribe(
			(data) => {
						console.log(data);
						this.auth.socialLogin(data).subscribe(res => { 
							console.log(res);
							if(res.status=="success"){
								this.auth.saveToken(res.token, res.user);
								this.router.navigateByUrl('/');
								this.success_alert(res.msg);								
							}
							else{
								this.error_alert(res.msg);
							}
				
						});
					}
		)
	}
		

	response_msg = "";
	sub:any;

	username = "";
	password = "";

	ngOnInit() : void {
		this.slimLoadingBarService.complete();
	}


  /*ngOnDestroy(){
    this.sub.unsubscribe();
  }*/

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



	login(){

		 let data = {
						username : this.username,
						password : this.password
		 };

		 if(data.username==""){ 
		 	this.error_alert("Username is required!");
		 	return false;
		 }
		 if(data.password==""){ 
		 	this.error_alert("Password is required!");
		 	return false;
		 }
		 this.http.post(globs.apiLink+'login/', data)
		 		  .map((response: Response) => response.json())
		 		  .subscribe(res => { 
		 		  		console.log(res);
		 		  		if(res.status=="success"){
							this.auth.saveToken(res.token, res.user);
							this.router.navigateByUrl('/');
							this.success_alert(res.msg);							
		 		  		}
		 		  		else{
		 		  			this.error_alert(res.msg);
		 		  		}

		 		   });
		 return false;
	}

}