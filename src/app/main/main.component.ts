import { Component } from '@angular/core';
import { PanelComponent } from './panel/panel.component';
import { initFlowbite } from 'flowbite';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PanelComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  ngOnInit() {
    initFlowbite();
  }
}
