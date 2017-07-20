import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ResponseUtils } from '../utils/response.utils';

 
@Injectable()
export class UserRequest {


    constructor(
        private http: Http,
        private responseUtils:ResponseUtils
        ) { }
    
    getUsers(user) {
        return this.http.post('http://localhost/sync_skills_api/users.php', user)
        .map((response: Response) => {
             return this.responseUtils.enrichUserResponse(response.json());
        });
       
    }
 
    getByUser(user) {
        return this.http.get('http://localhost/sync_skills_api/users.php' , user)
        .map((response: Response) => {
            return response.json()
        });
    }
 
    create(user) {
        return this.http.post('http://localhost/sync_skills_api/users.php', user)
        .map((response: Response) => {
            return response.json();
        });
    }
 
    update(user) {
        return this.http.put('http://localhost/sync_skills_api/users.php' , user)
        .map((response: Response) => {
            return response.json();
        });
    }
 
    deleteUser(user) {
        return this.http.post('http://localhost/sync_skills_api/users.php', user)
         .map((response: Response) => {
                return response.json();
         });
    }
 
    // private helper methods
 
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}