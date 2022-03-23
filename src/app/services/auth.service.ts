import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

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

  getUsers(){
    return new Promise<any>(resolve => {
      this.http.get(this.url + '/users',{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data);
        console.log(data);
      err => {
        console.log(err);
      }})
    })
  }

  activateUser(id: number){

    return new Promise(resolve => {
      this.http.post(this.url + '/activate',
      {
        user_id: id
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }
      })
    })
  }

  disableUser(id: number){

    return new Promise(resolve => {
      this.http.post(this.url + '/deactivate',
      {
        user_id: id
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }
      })
    })
  }

  deleteUser(id: number){

    return new Promise(resolve => {
      this.http.post(this.url + '/user/deleted/'+id,
      {
        user_id: id
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }
      })
    })

  }
}

