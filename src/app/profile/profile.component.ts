import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  isLogin: boolean = true;
  
  profileData = [];
  
  public loginTypes = [
       {type: 0, name: "Select"},
       {type: 1, name: "Admin"},
       {type: 2, name: "HR"},
       {type: 3, name: "Super Admin"}
  ]

  selectedValue = null;

  constructor(
    private profileService: ProfileService,
    private _dataService: DataService
    ) {}


  ngOnInit() {
    this.profileService.setActive('profile');
    this.isLogin = true;
    this.profileData = JSON.parse(this.profileService.getProfileCollection())[0];

  }

}
