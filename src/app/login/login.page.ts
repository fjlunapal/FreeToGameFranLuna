import { Component, OnInit } from '@angular/core';
import{ 
  FormControl,
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

  constructor(fb: FormBuilder, public auth: AuthService, public router: Router,) {

   }

  login(){
    this.auth.login(this.email.value, this.password.value).then(data => {
     if(this.auth.token != null && this.auth.actived == 1 && this.auth.type == 'a'){
       this.router.navigate(['/tabs']);
     }
     else if(this.auth.token != null && this.auth.actived == 1 && this.auth.type == 'u'){
      // RUTA DONDE MANDARA AL USUARIO: this.router.navigate(['/tabs']);
     }

    })

   }
  ngOnInit() {
  }
}
