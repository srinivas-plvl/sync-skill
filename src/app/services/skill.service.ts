import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as _ from 'underscore';



@Injectable()
export class SkillService {

    skillData = []
    categoriesData = [];
    skillsList = [];
    skillsSetData = [];


    setSkillsSetCollection(response:any) {
        this.skillsSetData = response;
    }

    getSkillsSetCollection() {
        return this.skillsSetData;
    }

    setSkillCollection(response:any) {
        this.skillData = response;
    }

    getSkillCollection() {
        return this.skillData;
    }

    getDomainsCollection() {
        return this.skillData['domains'];
    }
    
    getCategoriesCollection() {
        return this.skillData['categories'];
    }

    getSkillSetCollection(){
        var self = this;
        self.skillsList = [];
        _.each(this.skillData['categories'], function (item, index) {
            _.each(item['skills'], function (skill, index) {
            let newName = {
                id: skill['id'],
                itemName: skill['itemName']
            };
             self.skillsList.push(newName);
            })
        })
       return self.skillsList;
    }


}