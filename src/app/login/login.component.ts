import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { loginInt } from '../services/login/loginInterface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [   ReactiveFormsModule],
  // providers:[HttpClient, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = this.formbuilder.group({
    user:["", [Validators.required]],
    pass:["", [Validators.required]]
  })

  constructor(private formbuilder:FormBuilder, private loginService:LoginService, private router: Router) {
  }
  login() {

    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as loginInt).subscribe({
        next:(data)=>{
          //*Guardar los datos de usuario en el local storage
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



