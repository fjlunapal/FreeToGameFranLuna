import { Component, OnInit } from '@angular/core';
import{ 
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = new FormControl();
  password = new FormControl();

  constructor(fb: FormBuilder, public auth: AuthService, public router: Router) {

   }

  login(){
    this.auth.login(this.email.value, this.password.value).then(data => {
     if(this.auth.token != null){
       this.router.navigate(['/tabs']);
     }

    })

   }
  ngOnInit() {
  }
}
