import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login/login.service';
import { PanelComponent } from './panel/panel.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PanelComponent, RouterOutlet],
  providers: [CookieService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(private loginServicio: LoginService){
    if (!this.loginServicio.checkSesion()) {
      window.location.href = "/login"
    }
  }
  ngOnInit() {
    
    initFlowbite();
    
  }
}
