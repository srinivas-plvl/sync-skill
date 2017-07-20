import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {DataFilterPipe} from "./data-filter.pipe";
import {SkillFilterPipe} from "./skill-filter.pipe";
import { routes } from './app.router'
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SkillComponent } from './skill/skill.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { SkillService } from './services/skill.service';
import { ApplicationService } from './services/application.service';
import { ResponseUtils } from './utils/response.utils';
import { ProfileService } from './services/profile.service';
import { UserRequest } from './requests/user.request';
import { SkillRequest } from './requests/skill.request';
import { EmployeeRequest } from './requests/employee.request';
import { DataService } from './services/data.service'
import { NG2DataTableModule } from "angular2-datatable-pagination";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { AlertComponent } from './alert/alert.component';
import { UserModelComponent } from './user-model/user-model.component';
import { ModalModule } from 'ng2-modal-dialog/modal.module';
import { SkillModelComponent } from './skill-model/skill-model.component';
import { EmployeeModelComponent } from './employee-model/employee-model.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EqualValidator } from './equal-validator.directive';
import { SkillSetModelComponent } from './skill-set-model/skill-set-model.component';
import { ReportManagementComponent } from './report-management/report-management.component';
import { EmployeeUploadComponent } from './employee-upload/employee-upload.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    SkillComponent,
    EmployeeComponent,
    ProfileComponent,
    DataFilterPipe,
    SkillFilterPipe,
    AlertComponent,
    UserModelComponent,
    SkillModelComponent,
    EmployeeModelComponent,
    ChangePasswordComponent,
    EqualValidator,
    SkillSetModelComponent,
    ReportManagementComponent,
    EmployeeUploadComponent
  
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NG2DataTableModule,
    routes,
    AngularMultiSelectModule,
    NgIdleKeepaliveModule.forRoot(),
    ModalModule
  ],
  providers: [
    AuthenticationService, AlertService, ProfileService, UserService, SkillService, DataService, ApplicationService, ResponseUtils, UserRequest, SkillRequest, EmployeeRequest
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
