import { Component } from '@angular/core';
import { EmployeeService } from '../services/emp.service';
import { studentService } from '../services/student.service';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'my-app',
	templateUrl:'app/default/default.component.html',
	styleUrls: ['app/default/default.component.css'],
	providers: [EmployeeService, studentService, AuthService]
})
export class DefaultComponenet{ 	
	
	page_title: String = "Dashboard";
	empCount: any = 0;
    proffCount: any = 0;
    studCount:any = 0;

	constructor(private _employees: EmployeeService, private toastyService:ToastyService, private toastyConfig: ToastyConfig, private slimLoadingBarService: SlimLoadingBarService, private auth:AuthService, private _students:studentService) {
        this.auth.authenticate();
		this.toastyConfig.theme = 'material';
	}

	ngOnInit() : void {

            this._employees
                .getEmpCount()
                .subscribe(employees => {
                        this.empCount = employees.empCount;
                        this.proffCount = employees.proffCount;                        
                    });
            
            this._students            
                    .getStudCount()
                    .subscribe(students => {
                        this.studCount = students.studCount;
                    }); 
                    
             this.slimLoadingBarService.complete();
    }

    addToast() {
        // Just add default Toast with title only
        this.toastyService.default('Hi there');
        // Or create the instance of ToastOptions
        var toastOptions:ToastOptions = {
            title: "My title",
            msg: "The message",
            showClose: true,
            timeout: 5000,
            theme: 'default',
            onAdd: (toast:ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        // Add see all possible types in one shot
        this.toastyService.info(toastOptions);
        this.toastyService.success(toastOptions);
        this.toastyService.wait(toastOptions);
        this.toastyService.error(toastOptions);
        this.toastyService.warning(toastOptions);
    }

}