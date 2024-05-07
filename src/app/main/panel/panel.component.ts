import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Toast } from '../../../assets/const';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {
  // cookieService = inject(CookieService);
  
  constructor(private router: Router, private cookieService: CookieService){}
  
  navigate = (ruta: string) => this.router.navigateByUrl(`/${ruta}`);

  cerrarSesion(){
    this.cookieService.delete("user", "http://localhost:4200");
    this.router.navigateByUrl('/login');
    Toast.fire({
      icon: 'success',
      title: 'Sesión cerrada'
    })
  }

}
