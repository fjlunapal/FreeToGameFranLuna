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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  firstName = new FormControl();
  secondName = new FormControl();
  email = new FormControl();
  password = new FormControl();
  c_password = new FormControl();
  Validators: any;

  constructor(fb: FormBuilder, public auth: AuthService, public router: Router) { }

  async register(){
    this.auth.register(this.Validators.firstName, this.Validators.lastName, this.Validators.email, this.Validators.password, this.Validators.c_password).then(data =>{
      
    })
  }

  ngOnInit() {
  }

}
