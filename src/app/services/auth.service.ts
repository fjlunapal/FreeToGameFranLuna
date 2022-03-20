import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(){
    try{}
    catch(error){console.log('Error', error)}
  }

}


