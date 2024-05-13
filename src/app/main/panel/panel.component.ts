import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Toast } from '../../../assets/const';
import { userInt } from '../../services/login/userInterface';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {
  // cookieService = inject(CookieService);
  usuario!: userInt
  
  constructor(private router: Router, private loginService: LoginService){
    this.usuario = loginService.getUsuario();
  }
  
  navigate = (ruta: string) => this.router.navigateByUrl(ruta);

  cerrarSesion(){
    // this.cookieService.delete("user", "http://localhost:4200");
    this.loginService.cerrarSesion()
  }

}
