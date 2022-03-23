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

  ionicForm: FormGroup;
  isSubmitted = false;
  Validators: any;  

  constructor(public fb: FormBuilder, public auth: AuthService, public router: Router) {   
    this.ionicForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      secondName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      c_password: ['', [Validators.required]]
    })
     }
  
  ngOnInit() {
  }
  async register(){
    this.auth.register(this.Validators.firstName, this.Validators.lastName, this.Validators.email, this.Validators.password, this.Validators.c_password ).then(data =>{
      
    })
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
    }
  }

}
