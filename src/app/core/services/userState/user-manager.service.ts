import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  constructor() { }

  
  setUid(token:string){
    localStorage['uId']=token
  }

  getUid():string{
    return localStorage['uId'];
  }
  getUserInfo():any{
    return JSON.parse(localStorage['userInfo']);
  }

  setUserInfo(userInfo:any){
    localStorage['userInfo'] = JSON.stringify(userInfo);
  }
}
