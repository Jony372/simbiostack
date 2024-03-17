import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { __param } from 'tslib';
import { LoginService } from '../services/login/login.service';
import { loginInt } from '../services/login/loginInterface';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, RouterOutlet, ReactiveFormsModule, HttpClientModule],
  // providers:[HttpClient, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = this.formbuilder.group({
    user:["", [Validators.required]],
    pass:["", [Validators.required]]
  })

  constructor(private http:HttpClient, private formbuilder:FormBuilder, private loginService:LoginService, private router: Router) {
  }
  login() {

    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as loginInt).subscribe({
        next:(data)=>{
          // console.log(data);
        },
        error: (errorMessage)=> {
          alert("ERROR")
          console.error(errorMessage);
        },
        complete:(()=>{
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        })
      });
    }else if(this.loginForm.controls.pass.status ==  "INVALID" || this.loginForm.controls.user.status == "INVALID"){
      this.loginForm.markAllAsTouched();
    }
  }
}



