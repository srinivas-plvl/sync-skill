import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { ModalService } from 'ng2-modal-dialog/modal.module';
import { SkillModelComponent } from '../skill-model/skill-model.component';
import { SkillRequest } from '../requests/skill.request';
import { AppModule } from '../app.module';
import { SkillService } from '../services/skill.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
   
   skillInfo: any = {};
   public skilldata: any[];
   public skillQuery = "";
   public rowsOnPage = 5;
   public sortBy = "domain_name";
   public sortOrder = "asc";

  constructor( 
     private applicationService: ApplicationService,
     private modalService: ModalService,
     private skillRequest: SkillRequest,
     private skillService: SkillService,
     private profileService: ProfileService,
     private router: Router,
    ) { }

  ngOnInit() {

    this.profileService.setActive('skill');
    this.applicationService.setIsLoggedin(true);
    this.getSkills();
    //console.log(this.skillService.getDomainsCollection());
  }

  
  openSkillModal(skillData): void {
    this.modalService.create(AppModule, SkillModelComponent, {skillData});
  }

  public removeSkill(item) {
      let index = this.skilldata.indexOf(item);
      if(index>-1) {
          this.skilldata.splice(index, 1);
          this.skillInfo.loginID = "spal0002";
          this.skillInfo.type = "deleteSkill";
          this.skillInfo.skillId = item.skill_id;
          this.skillRequest.deleteSkill(this.skillInfo)
            .subscribe(
            data => {
              console.log(data);
            },
            error => {
              throw(error);
            });
      }
  }

   
    
  getSkills() {
    this.skillInfo.loginID = "spal0002";
    this.skillInfo.type = "getskills";
    this.skillRequest.getSkills(this.skillInfo)
      .subscribe(
      data => {
        if (data.success == true) {
           this.skillService.setSkillsSetCollection(data.data);
        } else {
         
        }
      },
      error => {

      });

  }

}
