import { Component, Input } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import * as globs from '../../services/globals';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: 'app/layouts/header/header.component.html',
  providers:[AuthService]
})
export class AppHeaderComponent  {

  authState:any = false;
  cur_Url:any = false;
  inactive_class:any = "";
  userInfo:any = {
    appEmpName:'',
    appUsername:'',
    appProffession:'',
    appUserID:''
  };

  constructor(private auth:AuthService, private router: Router){
    this.authState= this.auth.authStatus();    
    this.router.events.subscribe((val) => {
        this.authState = this.auth.authStatus();    
        this.userInfo = this.auth.getUser();
        this.cur_Url = this.router.url;
    });
  }

  toggle_sidebar(){
      if(this.inactive_class==""){
          this.inactive_class = "inactive";
      }
      else{
          this.inactive_class = "";
      }
  }


  logout(){
    this.auth.logout();
  }

  appName:String = globs.appName;
}