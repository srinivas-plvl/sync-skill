import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SkillService } from '../services/skill.service';
import { UserService } from '../services/user.service';
import { ApplicationService } from '../services/application.service';

import * as _ from 'underscore';

@Injectable()
export class ResponseUtils {

    private isLoggedin: boolean;

    constructor
        (
        private http: Http,
        private skillService: SkillService,
        private applicationService: ApplicationService,
        private userService: UserService
        ) { }



    enrichSkillResponse(response) {
        if (response) {
            return response;
        } else {
            return [];
        }
    }

    
    

    enrichSkillSetResponse(response) {

        if (response) {
            _.each(response.domains, function (item, index) {
                item['itemName'] = item['domain_name'];
                item['id'] = item['domain_id'];
            })
            _.each(response.categories, function (item, index) {
                item['itemName'] = item['category_name'];
                item['id'] = item['category_id'];
                _.each(item['skills'], function (skill, index) {
                    skill['itemName'] = skill['skill_name'];
                })
            })
         
            this.skillService.setSkillCollection(response);

        } else {
            return [];
        }
    }

    enrichUserResponse(response) {
        
        if (response) {
            return response;
        } else {
            return [];
        }
    }



}