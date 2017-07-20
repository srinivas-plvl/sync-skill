import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { ProfileService } from '../services/profile.service';
import { EmployeeRequest } from '../requests/employee.request';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin = false;
  empData: any = {};

  constructor(
     private authenticationService: AuthenticationService,
     private applicationService: ApplicationService,
     private profileService: ProfileService,
     private employeeRequest: EmployeeRequest,
  
     private router: Router
  ) { }

  ngOnInit() {
    console.log(this.profileService.loginType());
  }

  logout(){
     this.authenticationService.logout();
  }

  downloadEmpData(event){
      event.preventDefault();
      this.empData.loginID = "spal0002";
      this.empData.type = "downloadEmployees";
      this.employeeRequest.downloadEmpData(this.empData)
        .subscribe(
        data => {
          console.log(data);
        },
        error => {
         console.log(error);
        });
  }


}
