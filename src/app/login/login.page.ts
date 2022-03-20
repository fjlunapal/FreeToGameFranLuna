import { Component, OnInit } from '@angular/core';
import{ 
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  formularioLogin: FormGroup;

  constructor(fb: FormBuilder) {

    this.formularioLogin = fb.group({
      'email': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
    })
   }

  login(){
    console.log(this.email);
    console.log(this.password);
   }
  ngOnInit() {
  }

}
