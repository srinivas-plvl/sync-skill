import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { SkillService } from '../services/skill.service';
import { UserService } from '../services/user.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrls: ['./report-management.component.css']
})
export class ReportManagementComponent implements OnInit {


  domainSettings = {};
  categorySettings = {};
  skillSettings = {};
  managerSettings = {};

  selectedDomains = [];
  selectedCatgs = [];
  selectedSkills = [];
  selectedManagers = [];

  domainsList = [];
  categoriesList = [];
  skillsList = [];
  managersList = [];

  constructor(
    private profileService: ProfileService,
    private skillService: SkillService,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.profileService.setActive('reports');

    this.domainSettings = {
      singleSelection: false,
      selectAllText:'Select All',
      text: "Select Domain",
      enableCheckAll: true,
      enableSearchFilter: false
    };

    this.categorySettings = {
      singleSelection: false,
      selectAllText:'Select All',
      text: "Select Category",
      enableCheckAll: true,
      enableSearchFilter: false
    };

    this.skillSettings = {
      singleSelection: false,
      selectAllText:'Select All',
      enableCheckAll: true,
      text: "Select Skill",
      enableSearchFilter: false
    };

    this.managerSettings = {
      singleSelection: false,
      selectAllText:'Select All',
      enableCheckAll: true,
      text: "Select Manager",
      enableSearchFilter: false
    };
    

    this.domainsList = this.skillService.getDomainsCollection(); 
    this.categoriesList = this.skillService.getCategoriesCollection();
    this.skillsList = this.skillService.getSkillSetCollection();
    var managers = this.userService.getUserCollection();
    _.each(managers, function(item, index){
       item['itemName'] = item['emp_name'];
     })
     this.managersList = managers;
  }

}
