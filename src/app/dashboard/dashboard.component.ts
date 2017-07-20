import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLogin: boolean = true;
  
  domainsList = [];
  categoriesList = [];
  skillsList = [];

  selectedItems = [];
  selectedSkills = [];
  categorySettings = {};
  skillSettings = {};
  
  constructor(private _dataService: DataService) {
    
  }


  ngOnInit() {
    this.isLogin = true;
    this.getDomains();


    this.categorySettings = {
      singleSelection: false,
      text: "Select Category",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false
    };
    this.skillSettings = {
      singleSelection: false,
      text: "Select Skill",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false
    };
  }
  onItemSelect(item) {
    console.log('Selected Item:');
    console.log(item);
  }
  OnItemDeSelect(item) {
    console.log('De-Selected Item:');
    console.log(item);
  }
  onSkillSelect(item) {
    console.log('Selected Item:');
    console.log(item);
  }
  OnSkillDeSelect(item) {
    console.log('De-Selected Item:');
    console.log(item);
  }

  onSelectDept(deptid) {
    this.categoriesList = this._dataService.getCategories().filter((item) => item.id == deptid);
  }

  onSelectCategory(items) {
    console.log(items)
    var skillsData = this._dataService.getDomainsData();
    var domainData = skillsData[0];
    for (let i in domainData[0].categoryData) {
        if(domainData[0].categoryData[i].categoryName == items[0].itemName){
            for (let j in domainData[0].categoryData[i].skillData) {
            let newName = {
            id: j.toString(),
            itemName: domainData[0].categoryData[i].skillData[j]
          };
          this.skillsList.push(newName);
        }
        }
        
    }
  }
  
  getDomains() {

    var skillData = this._dataService.getDomainsData();
    var domainData = skillData[0];
    
    for (let i in domainData[0].domainsData) {
      let newName = {
        id: i.toString(),
        itemName: domainData[0].domainsData[i].domainName
      };
      this.domainsList.push(newName);
    }

    for (let i in domainData[0].categoryData) {
      let newName = {
        id: i.toString(),
        itemName: domainData[0].categoryData[i].categoryName
      };
      this.categoriesList.push(newName);
    }

  }


}
