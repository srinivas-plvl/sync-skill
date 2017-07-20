import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';



@Injectable()
export class UserService {

    private isLogin:boolean = false;
    userData = [];
    empData = [];

    getlogin():boolean {
        return this.isLogin;
    }

    setlogin(value:boolean) {
        this.isLogin = value;
    }

     

    setUserlCollection(response:any) {
        this.userData = response;
    }

    getUserCollection() {
        return this.userData;
    }

     setEmpCollection(response:any) {
        this.empData = response;
    }

    getEmpCollection() {
        return this.empData;
    }
    
    
    


}