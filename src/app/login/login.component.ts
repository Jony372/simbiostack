import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { loginInt } from '../services/login/loginInterface';
import { Toast } from '../../assets/const';
import { CookieService } from 'ngx-cookie-service';
import { userInt } from '../services/login/userInterface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [   ReactiveFormsModule],
  providers:[CookieService],
  // providers:[HttpClient, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  cookieService = inject(CookieService);
  // Toast = Toast;

  loginForm = this.formbuilder.group({
    user:["", [Validators.required]],
    pass:["", [Validators.required]]
  })

  constructor(private formbuilder:FormBuilder, private loginService:LoginService, private router: Router) {
    if (this.cookieService.check('user')) {
      this.router.navigateByUrl('/inicio');
    }
  }
  login() {

    if (this.loginForm.valid) {
      let usuario: userInt;
      this.loginService.login(this.loginForm.value as loginInt).subscribe({
        next:(data)=>{
          //*Guardar los datos de usuario en el local storage
          this.cookieService.set("user", JSON.stringify(data));
          usuario = data;

          // console.log(data);
        },
        error: (errorMessage)=> {
          // alert("ERROR")
          Toast.fire({
            icon: 'error',
            title: 'Usuario o contraseña incorrectos'
          })
          console.error(errorMessage);
        },
        complete:(()=>{
          this.router.navigateByUrl('/inicio');
          Toast.fire({
            icon: "success",
            title: `Bienvenido ${usuario.nombre}`
          })
          this.loginForm.reset();

        })
      });
    }else if(this.loginForm.controls.pass.status ==  "INVALID" || this.loginForm.controls.user.status == "INVALID"){
      Toast.fire({
        icon: 'info',
        title: 'Faltan datos por llenar'
      });
      this.loginForm.markAllAsTouched();

    }
  }
}



