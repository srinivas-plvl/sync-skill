import { Component, OnInit } from '@angular/core';
import { Modal } from 'ng2-modal-dialog/modal.module';
import { SkillRequest } from '../requests/skill.request';
import { SkillService } from '../services/skill.service';
import { UserService } from '../services/user.service';
import { EmployeeRequest } from '../requests/employee.request';
import { ApplicationService } from '../services/application.service';
import { AlertService } from '../services/alert.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-skill-set-model',
  templateUrl: './skill-set-model.component.html',
  styleUrls: ['./skill-set-model.component.css']
})

@Modal()
export class SkillSetModelComponent {

  closeModal: Function;
  empDetails: any = {};
  empList;

  domainSettings = {};
  categorySettings = {};
  skillSettings = {};

  selectedDomains = [];
  selectedCatgs = [];
  selectedSkills = [];

  domainsList = [];
  categoriesList = [];
  skillsList = [];



  constructor(
    private skillRequest: SkillRequest,
    private employeeRequest: EmployeeRequest,
    private alertService: AlertService,
    private applicationService: ApplicationService,
    private skillService: SkillService,
    private userService:UserService
    
  ) { }

  ngOnInit(): void {
    

    this.domainSettings = {
      singleSelection: false,
      text: "Select Domain",
      enableCheckAll: false,
      enableSearchFilter: false
    };

    this.categorySettings = {
      singleSelection: false,
      text: "Select Category",
      enableCheckAll: false,
      enableSearchFilter: false
    };

    this.skillSettings = {
      singleSelection: false,
      enableCheckAll: false,
      text: "Select Skill",
      enableSearchFilter: false
    };

    this.domainsList = this.skillService.getDomainsCollection(); 
    
  }


  
  onCancel(): void {
    this.closeModal();
  }

  onSelectDomain(value) {
    this.categoriesList = this.skillService.getCategoriesCollection();
  }

  onSelectCategory(catgs) {
   
    var self = this;
    self.skillsList = [];
    _.each(catgs, function (item, index) {
         _.each(item['skills'], function (skill, index) {
           let newName = {
            id: skill['id'],
            itemName: skill['itemName']
          };
           self.skillsList.push(newName);
        })
      })
  }

  updateSkills() {
    var dmns = [];
    var catgs = [];
    var skills = [];
    this.empDetails.type = "updateEmployees";
    this.empDetails.empList = this.empList;

    if (this.selectedDomains) {
      _.each(this.selectedDomains, function (item, index) {
        dmns.push(item.itemName);
      })
      this.empDetails.domains = dmns;
    }

    if (this.selectedCatgs) {
      _.each(this.selectedCatgs, function (item, index) {
        catgs.push(item.itemName);
      })
      this.empDetails.categories = catgs;
    }

    if (this.selectedSkills) {
      _.each(this.selectedSkills, function (item, index) {
        skills.push(item.itemName);
      })
      this.empDetails.skills = skills;
    }

    this.employeeRequest.update(JSON.stringify(this.empDetails))
      .subscribe(
      data => {
        if (data.success == true) {
           this.userService.setEmpCollection(data.data);
           this.closeModal();
        } else {
          this.alertService.error(data.message);
        }
      },
      error => {
          this.alertService.error(error);
      });
  }


}
