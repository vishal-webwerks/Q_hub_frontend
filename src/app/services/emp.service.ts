import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import * as globs from './globals';


@Injectable()
export class  EmployeeService{ 

	private _employeeurl='app/services/employee.json';

	constructor(private _http: Http){}

	getemployees(): Observable<any[]> {
	    return this._http.get(globs.apiLink+'employee/get_emp_list')
					      .map((response: Response) => <any[]> response.json());
					      //.do(data => console.log(JSON.stringify(data)));
	}

	getEmpCount(): Observable<any> {
	    return this._http.get(globs.apiLink+'employee/get_emp_count')
					      .map((response: Response) => <any> response.json());
					      //.do(data => console.log(JSON.stringify(data)));
	}


}