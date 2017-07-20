import { Injectable } from '@angular/core';
 
 
@Injectable()
export class ProfileService {

    profileCollection = [];
    
    private isLoggedin:boolean;
    private isActive :string;
   

    constructor() { }
    
    getProfileCollection = function() {
        return this.profileCollection;
    }

    setProfileCollection(data) {
        this.profileCollection = data;
    }
    
    loginType(){
         let profileData = JSON.parse(localStorage.getItem('currentUser'));
          return profileData[0].login_type;
    }

    getActive(){
        return this.isActive;
    }

    setActive(val:string){
       this.isActive = val;
    }

  
}