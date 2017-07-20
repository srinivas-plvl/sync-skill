import { Component } from '@angular/core';
import { Modal } from 'ng2-modal-dialog/modal.module';
import { UserRequest } from '../requests/user.request';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { ApplicationService } from '../services/application.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-model',
  templateUrl: './user-model.component.html',
  styleUrls: ['./user-model.component.css']
})
// the Modal import allows the usage of the @Modal alias that adds the Modal functions.
@Modal()
export class UserModelComponent {
 
  loginStatus: boolean = true;

  closeModal: Function;
  userData;
  
   public loginTypes = [
       {type: 1, name: "Admin"},
       {type: 2, name: "HR"},
       {type: 3, name: "Manager"}
  ]

  constructor(
    private applicationService: ApplicationService, 
    private alertService: AlertService,
    private userService: UserService,
    private userRequest: UserRequest,
    private router:Router
   ) {}

   ngOnInit(): void {
   }
 
  onCancel(): void {
    this.closeModal();
  }


  saveUser(): void {
    this.userData.loginID = "spal0002";
    this.userData.type = "create";
    this.userRequest.update(this.userData)
      .subscribe(
      data => {
        if (data.success == true) {
          setTimeout(() => {
             this.alertService.error(data.message);
          }, 4000);
          this.userService.setUserlCollection(data.data);
          this.closeModal();
        } else {
          this.alertService.error(data.message);
        }
      },
      error => {

      });

  }

 
}