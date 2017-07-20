import { Component, OnInit } from '@angular/core';
import { Modal } from 'ng2-modal-dialog/modal.module';
import { SkillService } from '../services/skill.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { ApplicationService } from '../services/application.service';
import { EmployeeRequest } from '../requests/employee.request';
import * as _ from 'underscore';

@Component({
  selector: 'app-employee-model',
  templateUrl: './employee-model.component.html',
  styleUrls: ['./employee-model.component.css']
})

@Modal()
export class EmployeeModelComponent implements OnInit{

  model: any = {};
  closeModal: Function;
  empDetails: any = {};

  domainSettings = {};
  categorySettings = {};
  skillSettings = {};

  skillsList = [];
  categoriesList = [];
  domainsList = [];

  selectedDomains = [];
  selectedCatgs = [];
  selectedSkills = [];
  

  constructor(
    private employeeRequest: EmployeeRequest,
    private skillService: SkillService,
    private router: Router,
    private alertService: AlertService,
    private applicationService: ApplicationService,
    private userService:UserService
    
  ) { }

  ngOnInit():void {

    this.domainSettings = {
      singleSelection: false,
      text: "Select Domain",
      enableCheckAll: false,
      enableSearchFilter: false
    };

     
     this.categorySettings = {
      singleSelection: false,
      text: "Select Category",
      enableCheckAll:false,
      enableSearchFilter: false
    };

      this.skillSettings = {
      singleSelection: false,
      enableCheckAll:false,
      text: "Select Skill",
      enableSearchFilter: false
    };


    this.domainsList = this.skillService.getDomainsCollection(); 

    if(this.empDetails.tech_domain){
      this.categoriesList = this.skillService.getCategoriesCollection();
    }
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

saveEmployee() {
    
    let dmns = [];
    let catgs= [];
    let skills = [];
    this.empDetails.type = "create";
    
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
    
    this.employeeRequest.create(this.empDetails)
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
