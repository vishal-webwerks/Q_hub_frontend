import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import * as globs from './globals';

@Injectable()
export class studentService{

    constructor(private _http: Http){}

    save(frmData:any[]): Observable<any> {
	    return this._http.post(globs.apiLink+'student/save', frmData)
                         .map((response: Response) => <any> response.json());
    }

    update(frmData:any[]): Observable<any> {
	    return this._http.post(globs.apiLink+'student/update', frmData)
                         .map((response: Response) => <any> response.json());
    }

    getStuds(): Observable<any[]> {
	    return this._http.get(globs.apiLink+'student/get')
                         .map((response: Response) => <any[]> response.json());
    }

    getStudCount(): Observable<any> {
	    return this._http.get(globs.apiLink+'student/getCount')
                         .map((response: Response) => <any> response.json());
    }
    
    getOne(studId:any): Observable<any[]> {
	    return this._http.post(globs.apiLink+'student/getOne', { studId : studId })
                         .map((response: Response) => <any[]> response.json());
	}


    
}