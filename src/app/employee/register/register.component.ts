import { Component } from '@angular/core';
import { Http , Response } from '@angular/http';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { genFuncService } from '../../services/genFunc.service';
import * as globs from '../../services/globals';

@Component({
	selector: 'my-app',
	templateUrl: 'app/employee/register/register.component.html',
	styleUrls: ['app/employee/register/register.component.css'],
	providers: [genFuncService]
})
export class RegisterComponent{ 
	name = 'Register Component'; 

	response_msg = "";

	emp_name = "";
	proffession = "";
	address = "";
	username = "";
	password = "";

	constructor(private http: Http, private slimLoadingBarService: SlimLoadingBarService,private _genFuncService:genFuncService){
		
	}
	
	ngOnInit() {
		this.slimLoadingBarService.complete();
	}	  
	

	save_emp(){

		 let data = {
						emp_name : this.emp_name,
						proffession : this.proffession,
						address : this.address,
						username : this.username,
						password : this.password
		 };

		 if(data.emp_name==""){ 
			this._genFuncService.error_alert("Employee name is required!");
		 	return false;
		 }
		 if(data.proffession==""){ 
			this._genFuncService.error_alert("Profession is required!");
		 	return false;
		 }
		 if(data.address==""){ 
			this._genFuncService.error_alert("Address is required!");
		 	return false;
		 }
		 if(data.username==""){ 
			this._genFuncService.error_alert("Username is required!");
		 	return false;
		 }
		 if(data.password==""){ 
			this._genFuncService.error_alert("Password is required!");
		 	return false;
		 }

		 this.http.post(globs.apiLink+'employee/save_emp', data)
		 		  .map((response: Response) => response.json())
		 		  .subscribe(res => { 		 		  		
		 		  		if(res.status=="success"){
							this.emp_name = this.proffession = this.address = this.username = this.password = "";				
							this._genFuncService.success_alert(res.msg);						
		 		  		}
		 		  		else{							
							this._genFuncService.error_alert(res.msg);			
		 		  		}
		 		  		

		 		   });
		 return false;
	}
}