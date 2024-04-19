import { Component } from '@angular/core';
import { ThemeServiceService } from '../../services/theme-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {
  
  constructor(private router: Router){}
  
  navigate = (ruta: string) => this.router.navigateByUrl(`/${ruta}`);



}
