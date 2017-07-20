import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationService {

    private isLoggedin:boolean;
    empData = [];

    showMsg:boolean = false;

    constructor(){ }
    
    getIsLoggedin():boolean {
        return this.isLoggedin;
    }

    setIsLoggedin(value:boolean) {
        this.isLoggedin = value;
    }

    setEmpData(response:any) {
        this.empData = response;
    }

    getEmpData() {
        return this.empData;
    }



    // getUsers() {
    //     return this.http.post('http://localhost/sync_skills_api/ajax.php', this.jwt()).map((response: Response) => response.json());
    // }
 
    // getById(id: number) {
    //     return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    // }
 
    // create(user: User) {
    //     return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    // }
 
    // update(user: User) {
    //     return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    // }
 
    // delete(id: number) {
    //     return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    // }


    // // private helper methods
 
    // private jwt() {
    //     // create authorization header with jwt token
    //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     if (currentUser && currentUser.token) {
    //         let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
    //         return new RequestOptions({ headers: headers });
    //     }
    // }
}