import { Component, OnInit } from '@angular/core';
import { Modal } from 'ng2-modal-dialog/modal.module';
import { SkillRequest } from '../requests/skill.request';
import { SkillService } from '../services/skill.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-skill-model',
  templateUrl: './skill-model.component.html',
  styleUrls: ['./skill-model.component.css']
})

@Modal()
export class SkillModelComponent {

  closeModal: Function;
  skillData;
  otherDomain = false;
  otherCategory = false;
  catgs;
  domains;

  constructor(
    private skillRequest: SkillRequest,
    private skillService: SkillService
  ) { }

  ngOnInit(): void {
   
      this.catgs = this.skillService.getCategoriesCollection();
      var catExisted = false;
      _.each(this.catgs, function (item, index) {
             if (item['category_name']=='OtherCategory') {
                  catExisted = true;
              }  
        })
        if(!catExisted){
          let etccatg = {};
          etccatg['category_id'] = this.catgs.length+1;
          etccatg['category_name'] = "OtherCategory";
          this.catgs.push(etccatg);
        }

        this.domains = this.skillService.getDomainsCollection();

        var domainExisted = false;
      _.each(this.domains, function (item, index) {
             if (item['domain_name']=='OtherDomain') {
                  domainExisted = true;
              }  
        })
        if(!domainExisted){
          let etcdomain = {};
          etcdomain['domain_id'] = this.domains.length+1;
          etcdomain['domain_name'] = "OtherDomain";
          this.domains.push(etcdomain);
        }
      
      this.skillData.category = this.skillData.category_id;
      this.skillData.domain = this.skillData.domain_id;
          
  }


  
  onCancel(): void {
    this.closeModal();
  }

  getDomain(event: any): void {
    if (event.target.selectedOptions[0].title == 'OtherDomain') {
      this.otherDomain = true;
      this.skillData.domain = '';
    } else {
      this.otherDomain = false;
      this.skillData.domain = parseInt(this.skillData.domain);
    };
  }

  getCategory(event: any): void {
    if (event.target.selectedOptions[0].title == 'OtherCategory') {
      this.otherCategory = true;
      this.skillData.category = '';
    } else {
      this.otherCategory = false;
      this.skillData.category = parseInt(this.skillData.category);
    };
  }

  saveSkill(): void {
    
    this.skillData.loginID = "spal0002";
    this.skillData.type = "create";
    this.skillRequest.update(this.skillData)
      .subscribe(
      data => {
        if (data.success == true) {
          this.skillService.setSkillsSetCollection(data.data);
          this.closeModal();
        } else {

        }
      },
      error => {

      });

  }
}
