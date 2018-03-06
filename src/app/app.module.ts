import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {ToastyModule} from 'ng2-toasty';
import {DataTableModule} from "angular2-datatable";
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import { MyDatePickerModule } from 'mydatepicker';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { ChartsModule } from 'ng2-charts';
import { Angular2SocialLoginModule } from "angular2-social-login";


import { AppComponent }  from './app.component'; 
import { DefaultComponenet } from './default/default.component';
import { RegisterComponent } from './employee/register/register.component';
import { ListComponent } from './employee/list/list.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page_not_found/pageNotFound.component';
import { AppHeaderComponent } from './layouts/header/header.component';
import { AppFooterComponent } from './layouts/footer/footer.component';
import { dynFormComponent } from './dynForm/dynForm.component';
import { ChartsComponent } from './charts/charts.component';
import {TruncatePipe} from './pipes/truncate';

let providers = {
    "google": {
      "clientId": "219140989334-rqgtemctq5h10njd4n8qdlruu6pqaojb.apps.googleusercontent.com"
    },
    /* "linkedin": {
      "clientId": "LINKEDIN_CLIENT_ID"
    },
    "facebook": {
      "clientId": "FACEBOOK_CLIENT_ID",
      "apiVersion": "<version>" //like v2.4 
    } */
  };

const appRoutes: Routes = [
	{ path: '', component: DefaultComponenet },
	{ path: 'RegisterComponent', component: RegisterComponent },
	{ path: 'ListComponent', component: ListComponent },
	{ path: 'LoginComponent', component: LoginComponent },
	{ path: 'dynForm', component: dynFormComponent },
	{ path: 'charts', component: ChartsComponent },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports:      [ 
                  BrowserModule, 
                  RouterModule.forRoot(appRoutes), 
                  HttpModule, 
                  FormsModule, 
                  ReactiveFormsModule,
                  ToastyModule.forRoot(), 
                  DataTableModule, 
                  SlimLoadingBarModule.forRoot(),
                  MyDatePickerModule,
                  NguiAutoCompleteModule,
                  ChartsModule,
                  Angular2SocialLoginModule
                ],
  declarations: [ 
                  AppComponent, 
                  DefaultComponenet, 
                  RegisterComponent, 
                  ListComponent, 
                  PageNotFoundComponent, 
                  LoginComponent, 
                  AppHeaderComponent, 
                  AppFooterComponent, 
                  dynFormComponent ,
                  TruncatePipe,
                  ChartsComponent
                ],  
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);