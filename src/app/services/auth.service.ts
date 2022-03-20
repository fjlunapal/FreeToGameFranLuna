import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
token: any;

 url='http://semillero.allsites.es/public/api';
  constructor(private http: HttpClient) { }

  login(myemail: string, mypassword: string){
    return new Promise(resolve => {
      this.http.post<any>(this.url + '/login', 
      {
        email: myemail, 
        password: mypassword})     
        .subscribe(data => {
          this.token = data.data.token;
          resolve(data);   
          console.log(data);   
          err=> {
            console.log(err)
          }      
      });
    });
  }
}

