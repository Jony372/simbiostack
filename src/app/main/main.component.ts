import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { getUser } from '../../assets/const';
import { PanelComponent } from './panel/panel.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PanelComponent, RouterOutlet],
  providers: [CookieService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  cookieService = inject(CookieService);

  constructor(private router: Router){
    if (!this.cookieService.check('user')) {
      this.router.navigateByUrl('/login');
    }
  }
  ngOnInit() {
    
    initFlowbite();
    
  }
}
