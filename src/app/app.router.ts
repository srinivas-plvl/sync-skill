import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { SkillComponent } from './skill/skill.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportManagementComponent } from './report-management/report-management.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmployeeUploadComponent } from './employee-upload/employee-upload.component';

export const router: Routes = [
    { path:'', component: LoginComponent},
    { path:'user', component:UserComponent },
    { path:'employee', component:EmployeeComponent },
    { path:'login', component:LoginComponent },
    { path:'skill', component:SkillComponent },
    { path:'profile', component:ProfileComponent },
    { path:'reports', component:ReportManagementComponent },
    { path:'changepassword', component:ChangePasswordComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'uploademployee', component:EmployeeUploadComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);