import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ResponseUtils } from '../utils/response.utils';
 
@Injectable()
export class SkillRequest {


    constructor(
        private http: Http,
        private responseUtils:ResponseUtils
        ) {}
    
    getSkills(skill) {
        return this.http.post('http://localhost/sync_skills_api/skills.php', skill)
        .map((response: Response) => {
             return this.responseUtils.enrichSkillResponse(response.json());  
        });
    }

    getSkillSet(skill) {
        return this.http.post('http://localhost/sync_skills_api/skills.php', skill)
        .map((response: Response) => {
             return this.responseUtils.enrichSkillSetResponse(response.json());  
        });
    }
    
 
 
    create(skill) {
        return this.http.post('http://localhost/sync_skills_api/skills.php', skill)
        .map((response: Response) => {
            return response.json();
        });
    }
 
    update(skill) {
        return this.http.put('http://localhost/sync_skills_api/skills.php' , skill)
        .map((response: Response) => {
            return response.json();
        });
    }
 
     deleteSkill(skill) {
        return this.http.post('http://localhost/sync_skills_api/skills.php', skill)
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