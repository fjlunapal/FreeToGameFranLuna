import { Component, OnInit } from '@angular/core';
import{ 
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;
  Validators: any;  
  alertController: any;

  constructor(public fb: FormBuilder, public auth: AuthService, public router: Router, public alert: AlertController) {   
    this.ionicForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      secondname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      c_password: ['', [Validators.required]]
    })
     }
  
  ngOnInit() {
  }

  submitForm() {
    var f = this.ionicForm.value;
    this.isSubmitted = true;

    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
      this.auth.register(this.ionicForm.value['firstname'], this.ionicForm.value['secondname'], this.ionicForm.value['email'], this.ionicForm.value['password'], this.ionicForm.value['c_password']).then(data => {
        this.registerAlert();
       })
    }
  }

  async registerAlert() {
    const alert = await this.alert.create({
      header: 'Warning',
      message: 'You must confirm your account by the email address you used to sign up, after this, the administrator will activate your account',
      buttons: [
        {
          text: 'Ok',
          id: 'cancel-button',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
            this.router.navigate(['/']);
          }
        }
      ]
    });
    await alert.present();
  }

}
