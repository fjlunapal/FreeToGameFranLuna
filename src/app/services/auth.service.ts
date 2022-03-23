import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  id: any;
  type: any;
  actived: any;

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
          this.id= data.data.id;
          this.type= data.data.type;
          this.actived=data.data.actived;
          resolve(data);   
          console.log(data);   
          err=> {
            console.log(err)
          }      
      });
    });
  }

  register(myName: string, mysecondname: string, myEmail: string, myPassword: string, myPasswordConf : string){
    return new Promise(resolve => {
      this.http.post(this.url + '/register', 
      {
        firstname: myName,
        secondname: mysecondname,
        email: myEmail,
        password: myPassword,
        c_password: myPasswordConf})
        .subscribe(data => {
          console.log(data);
          resolve(data);
        });
    });
  }
}

