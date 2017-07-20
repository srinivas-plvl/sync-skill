import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { UserRequest } from '../requests/user.request';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { Http } from "@angular/http";
import { ModalService } from 'ng2-modal-dialog/modal.module';
import { UserModelComponent } from '../user-model/user-model.component';
import { AppModule } from '../app.module';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isLogin: boolean = true;
  model: any = {};
  public userdata: any[];
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(
    private router: Router,
    private applicationService: ApplicationService,
    private alertService: AlertService,
    private http: Http,
    private modalService: ModalService,
    private userService: UserService,
    private profileService: ProfileService,
    private userRequest: UserRequest
  ) { }

  ngOnInit(): void {
    this.profileService.setActive('user');
    //this.userdata = this.userService.getUserCollection();
    this.applicationService.setIsLoggedin(true);

  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.city.length;
  }



  public remove(item) {
    let index = this.userdata.indexOf(item);
    
    if (index > -1) {
      this.userdata.splice(index, 1);
      this.model.loginID = "spal0002";
      this.model.type = "deleteUser";
      this.model.userId = item.id;
      this.userRequest.deleteUser(this.model)
        .subscribe(
        data => {
          console.log(data);
        },
        error => {
          throw(error);
        });
    }
  }

  openUserModal(userData): void {
    this.modalService.create(AppModule, UserModelComponent, { userData });
  }

  
}
