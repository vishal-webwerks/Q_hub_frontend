import { Component } from '@angular/core';
import { EmployeeService } from '../../services/emp.service';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
let $ = require('https://code.jquery.com/jquery-3.2.1.min.js');
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { AuthService } from '../../services/auth.service';
import * as globs from '../../services/globals';

@Component({
	selector: 'my-app',
	templateUrl: 'app/employee/list/list.component.html',
	styleUrls: ['app/employee/list/list.component.css'],
	providers: [AuthService, EmployeeService]
})
export class ListComponent {
	
	response_msg = "";
	thumb_display = true;

	emp_id:any = "";
	emp_name:any = "";
	proffession:any = "";
	address:any = "";
	username:any = "";

	employees: any[];
	constructor(private _employees: EmployeeService, private http: Http, private toastyService:ToastyService, private toastyConfig: ToastyConfig, private slimLoadingBarService: SlimLoadingBarService, private auth:AuthService) { 
		
		this.toastyConfig.theme = 'material';

		this.auth.authenticate();

	}

	ngOnInit() : void {
      this._employees.getemployees()
      .subscribe(employees => this.employees = employees);

		this.slimLoadingBarService.complete();
	}
	

    ngAfterViewInit(){
   		//$('#update_modal').modal('show');
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

	show_modal(){
		$('#update_modal').addClass('show').css('display', 'block');
	}
	hide_modal(){
		$('#update_modal').removeClass('show').css('display', 'none');
	}

    getEmpInfo(emp_id:String){
    	this.emp_id = emp_id;
    	this.http.post(globs.apiLink+'employee/get_emp_info', { emp_id : emp_id })
		 		  .map((response: Response) => response.json())
		 		  .subscribe(res => { 	
		 		  		this.emp_name = res.emp_name;
						this.proffession = res.proffession;
						this.address = res.address;
						this.username = res.username;
						//$('#update_modal').modal('show');
						this.show_modal();
		 		   });
    }

	update_emp(){

		 let data = {
						emp_id : this.emp_id,
						emp_name : this.emp_name,
						proffession : this.proffession,
						address : this.address,
						username : this.username
		 };

		 if(data.emp_name=="" || data.emp_name==undefined){ 
		 	this.error_alert("Employee name is required!");
		 	return false;
		 }
		 if(data.proffession=="" || data.proffession==undefined){ 
		 	this.error_alert("Profession is required!");
		 	return false;
		 }
		 if(data.address=="" || data.address==undefined){ 
		 	this.error_alert("Address is required!");
		 	return false;
		 }
		 if(data.username=="" || data.username==undefined){ 
		 	this.error_alert("Username is required!");
		 	return false;
		 }

		 this.http.post(globs.apiLink+'employee/update_emp', data)
		 		  .map((response: Response) => response.json())
		 		  .subscribe(res => { 		 		  		
		 		  		if(res.status=="success"){
							//this.emp_name = this.proffession = this.address = "";	
							this.success_alert(res.msg);
		 		  		}
		 		  		else{	
		 		  			this.error_alert(res.msg);				
		 		  		}
		 		  		//$('#update_modal').modal('hide');
		 		  		//this.hide_modal();
		 		  		this.ngOnInit();

		 		   });
		 return false;
	}
	
	listingState(state:any){
		this.thumb_display = state;
	}

}