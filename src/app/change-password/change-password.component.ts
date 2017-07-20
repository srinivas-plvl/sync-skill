import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ApplicationService } from '../services/application.service';
import { AlertService } from '../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  profileData;
  credentials:{
     oldpassword:string;
     password: string;
     confirmPassword: string;
  };

  constructor(
    private router: Router,
    private alertService: AlertService,
     private applicationService: ApplicationService,
    private authenticationService: AuthenticationService

  ) { }

  ngOnInit() {
     
    this.credentials = {
      oldpassword: '',
      password: '',
      confirmPassword: ''
    }
  }


changepassword(credentials, isValid: boolean) {
    this.profileData = JSON.parse(localStorage.getItem('currentUser'));
    credentials.emp_id = this.profileData[0].emp_id;
    credentials.email = this.profileData[0].email;
    credentials.type = "change_password";
    if(isValid){
      this.authenticationService.change_password(credentials)
            .subscribe(
                data => {
                    if(data.success==true){
                        this.alertService.success(data.message);
                        setTimeout(()=>{   
                              this.authenticationService.logout();
                              this.applicationService.setIsLoggedin(false);
                              this.router.navigate(['./login']);
                        },3000);
                       
                       
                        
                    } else {
                        this.alertService.error(data.message);
                    }
                },
                error => {
                     this.alertService.error(error);
                });
    }
  }

}
