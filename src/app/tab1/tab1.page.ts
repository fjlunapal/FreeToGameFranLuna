import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { IonList, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  users: any;
  @ViewChild('list',{static:true}) list: IonList;

  constructor(private authService: AuthService, private router: Router, public alertController: AlertController) {
  }

  ngOnInit() {

    if(this.authService.token != undefined){
      this.authService.getUsers().then(users => {
        this.users = users.data;
        console.log(users.data)
      });
    }
    else{ 
      this.router.navigate(['/login'])
    }
  }

  activate(id: number) {
    this.authService.activateUser(id);
    this.list.closeSlidingItems();
    this.ngOnInit();
    this.ngOnInit();
  }

  disable(id: number) {
    this.authService.disableUser(id);
    this.list.closeSlidingItems();
    this.ngOnInit();
    this.ngOnInit();
  }

  async delete(id: number) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Delete User',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',	
          cssClass: 'secondary',
          handler: () => {}
       },
       {
         text: 'OK',
         handler: () => {
          this.authService.deleteUser(id)
          this.ngOnInit();
         }
      }

      ]
    });

    await alert.present();

    this.list.closeSlidingItems();
  }
}
