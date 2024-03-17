import { Component } from '@angular/core';
import { NotesComponent } from './notes/notes.component';
import { InicioComponent } from '../menu/inicio/inicio.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NotesComponent, InicioComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
