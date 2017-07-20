import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { ProfileService } from '../services/profile.service';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private applicationService: ApplicationService,
        private authenticationService: AuthenticationService,
        private profileService: ProfileService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    if(data.success==true){
                        localStorage.setItem('currentUser',JSON.stringify(data.data));
                        this.profileService.setProfileCollection(data.data);
                        this.applicationService.setIsLoggedin(true);
                        this.router.navigate(['./employee']);
                    } else {
                         this.applicationService.setIsLoggedin(false);
                         this.alertService.error(data.message);
                         this.loading = false;
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
