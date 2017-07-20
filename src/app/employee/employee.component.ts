import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { EmployeeRequest } from '../requests/employee.request';
import { ModalService } from 'ng2-modal-dialog/modal.module';
import { UserRequest } from '../requests/user.request';
import { AlertService } from '../services/alert.service';
import { SkillRequest } from '../requests/skill.request';
import { ProfileService } from '../services/profile.service';
import { EmployeeModelComponent } from '../employee-model/employee-model.component';
import { SkillSetModelComponent } from '../skill-set-model/skill-set-model.component';
import { SkillService } from '../services/skill.service';
import { AppModule } from '../app.module';
import { UserService } from '../services/user.service';

import * as _ from 'underscore';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  errMsg:  string;
  empData: any = {};

  public employeeData: any[];
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "email";
  public sortOrder = "asc";

  empList = [];

  domainsList = [];
  categoriesList = [];
  skillsList = [];

  selectedCatgs = [];
  selectedSkills = [];
  categorySettings = {};
  skillSettings = {};

  constructor(
    private _dataService: DataService,
    private applicationService: ApplicationService,
    private employeeRequest: EmployeeRequest,
    private skillRequest: SkillRequest,
    private userRequest: UserRequest,
    private alertService: AlertService,
    private modalService: ModalService,
    private profileService: ProfileService,
    private userService: UserService,
    private skillService: SkillService,
    private router: Router
  ) { }


  ngOnInit() {
    this.getEmployees();
    this.profileService.setActive('employee');
    this.applicationService.setIsLoggedin(true);
    let userData = this.profileService.getProfileCollection();
    this.getSkillSet();
    this.getUsers();
  }

  openEmployeeModal(empDetails): void {
    this.modalService.create(AppModule, EmployeeModelComponent, { empDetails });
  }

  openSkillSetModal(empList): void {
    this.modalService.create(AppModule, SkillSetModelComponent, {empList});
  }

 


  updateEmpSelect(value, event) {
    if (event.target.checked) {
      this.empList.push(value);
    }
    else if (!event.target.checked) {
      let indexx = this.empList.indexOf(value);
      this.empList.splice(indexx, 1);
    }
    console.log(this.empList);
  }

  public remove(item) {
    let index = this.employeeData.indexOf(item);
    if (index > -1) {
      this.employeeData.splice(index, 1);
      this.empData.loginID = "spal0002";
      this.empData.type = "deleteEmployee";
      this.empData.empId = item.emp_id;
      this.employeeRequest.deleteEmployee(this.empData)
        .subscribe(
        data => {
          console.log(data);
        },
        error => {
          throw (error);
        });
    }
  }



  getEmployees() {
    this.empData.loginID = "spal0002";
    this.empData.type = "getEmployees";
    this.employeeRequest.getEmployees(this.empData)
      .subscribe(
      data => {
         this.userService.setEmpCollection(data.data);
      },
      error => {
        this.alertService.error(error);
      });

  }

  getUsers() {
    this.empData.loginID = "spal0002";
    this.empData.type = "getusers";

    this.userRequest.getUsers(this.empData)
      .subscribe(
      data => {
        this.userService.setUserlCollection(data.data);
      },
      error => {

      });

  }

  getSkillSet() {
    this.empData.loginID = "spal0002";
    this.empData.type = "getSkillSet";
    this.skillRequest.getSkillSet(this.empData)
      .subscribe(
      data => {

      },
      error => {
      });

  }

  onSelectDept(value) {
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
    var catgs = [];
    var skills = [];
    this.empData.type = "updateEmployees";
    this.empData.empList = this.empList;
    if (this.selectedCatgs) {
      _.each(this.selectedCatgs, function (item, index) {
        catgs.push(item.itemName);
      })
      this.empData.categories = catgs;
    }

    if (this.selectedSkills) {
      _.each(this.selectedSkills, function (item, index) {
        skills.push(item.itemName);
      })
      this.empData.skills = skills;
    }

    this.employeeRequest.update(JSON.stringify(this.empData))
      .subscribe(
      data => {
        if (data.success == true) {
          this.employeeData = data.data;
          document.querySelector('.main-panel').scrollTop = 0;
          this.applicationService.showMsg = true;
          this.errMsg ="Employee details updated successfully";
          setTimeout(() => {
            this.selectedCatgs = [];
            this.selectedSkills = [];
            this.empData.domainName = '';
            this.applicationService.showMsg = false;
          }, 3000);

        } else {
          this.alertService.error(data.message);
        }
      },
      error => {

      });
  }

}
