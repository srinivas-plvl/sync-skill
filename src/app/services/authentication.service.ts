import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApplicationService } from '../services/application.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(
        private router: Router,
        private applicationService: ApplicationService,
        private http: Http) {}

    login(username: string, password: string) {
        return this.http.post('http://localhost/sync_skills_api/login.php', JSON.stringify({ 'type' : 'login_user', username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                   let userData = response.json();
                //    localStorage.setItem('currentUser',JSON.stringify(userData.data));
                   return  userData;
                    
                // console.log("logged in data "+ user);
                // if (user) {
                //     localStorage.setItem('currentUser', JSON.stringify(user));
                // }
            });
    }

    change_password(credentials) {
        return this.http.post('http://localhost/sync_skills_api/login.php', JSON.stringify(credentials))
            .map((response: Response) => {
                   let resData = response.json();
                   console.log(resData);
                   return resData;
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.applicationService.setIsLoggedin(false);
        this.router.navigate(['./login']);
    }

     private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

}