import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { EmployeeRequest } from '../requests/employee.request';

@Component({
  selector: 'app-employee-upload',
  templateUrl: './employee-upload.component.html',
  styleUrls: ['./employee-upload.component.css']
})
export class EmployeeUploadComponent implements OnInit {


  empFile: FileList;
  empData: any = {};
  constructor(
    private profileService: ProfileService,
    private employeeRequest: EmployeeRequest,
    private http: Http

  ) { }

  ngOnInit() {

    this.profileService.setActive('uploademployee');
  }


  fileChange(event) {
    this.empFile = event.target.files;
  }


  uploadData(event) {
    event.preventDefault();
    let fileList: FileList = this.empFile;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('EmpData', file, file.name);
      formData.append('type', 'uploadEmployees');
      this.employeeRequest.uploadData(formData)
        .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
    }
  }

}