import { Component } from '@angular/core';
import { EmployeeService } from '../services/emp.service';
import { studentService } from '../services/student.service';
import { AuthService } from '../services/auth.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
    selector:'my-app',
    templateUrl:'app/charts/charts.component.html',
    providers: [EmployeeService, studentService, AuthService]
})

export class ChartsComponent{

    doughnutChartLabels:string[] = ['Students', 'Employees'];
    doughnutChartData:number[] = [100, 100];
    doughnutChartType:string = 'doughnut';   

    constructor(private _employees: EmployeeService, private auth:AuthService, private _students:studentService, private slimLoadingBarService: SlimLoadingBarService){
        this.auth.authenticate();
    }

    ngOnInit() : void {
        
        this._employees
            .getEmpCount()
            .subscribe(employees => {
                this.doughnutChartData[1] = employees.empCount;
            });
        
        this._students            
                .getStudCount()
                .subscribe(students => {
                    this.doughnutChartData[0] = students.studCount;
                }); 
        this.slimLoadingBarService.complete();
    }  
    
    
    public chartClicked(e:any):void {
      console.log(e);
    }
   
    public chartHovered(e:any):void {
      console.log(e);
    }  
    
}