import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  id: any;
  type: any;
  actived: any;
  deleted: any;
  url='http://semillero.allsites.es/public/api';
  email_confirmed: any;
  alertController: any;
  
  constructor(private http: HttpClient, public alert: AlertController) { }

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
          console.log(data);
          resolve(data);              
      }, err => {
          this.invalidLoginAlert();
          console.log('Error'+err);
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
        }, err => {
          this.registerEmailExistsAlert();
          console.log('Error'+err);
        })
    });
  }

  async registerEmailExistsAlert() {
    const alert = await this.alert.create({
      header: 'Warning',
      message: 'This email account already exists',
      buttons: [
        {
          text: 'Ok',
          id: 'cancel-button',
          handler: (blah) => {
          }
        }
      ]
    });
    await alert.present();
  }

  async invalidLoginAlert() {
    const alert = await this.alert.create({
      header: 'Warning',
      message: 'Email or password invalid',
      buttons: [
        {
          text: 'Ok',
          id: 'cancel-button',
          handler: (blah) => {
          }
        }
      ]
    });
    await alert.present();
  }

  async userNotActivedAlert() {
    const alert = await this.alert.create({
      header: 'Warning',
      message: 'This user is not activated, please verify that you have confirmed your account by email and wait the administrator to activate your account. If the error persists, please contact with the administrator.',
      buttons: [
        {
          text: 'Ok',
          id: 'cancel-button',
          handler: (blah) => {
          }
        }
      ]
    })
    await alert.present();
  }

  async registerValuesNotOkAlert() {
    const alert = await this.alert.create({
      header: 'Warning',
      message: 'Please, write all the required fields properly.',
      buttons: [
        {
          text: 'Ok',
          id: 'cancel-button',
          handler: (blah) => {
          }
        }
      ]
    })
    await alert.present();
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

  activateUser(id: number, email_confirmed: number){
    console.log(email_confirmed)
    if(email_confirmed==1){
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
    else{
      console.log("email no confirmado")
    }

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

