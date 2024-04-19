import { Component } from '@angular/core';
import { intPendiente } from '../../../services/pendientes/pendientesInterface';
import { PendientesService } from '../../../services/pendientes/pendientes.service';

@Component({
  selector: 'app-pendientes',
  standalone: true,
  imports: [],
  templateUrl: './pendientes.component.html',
  styleUrl: './pendientes.component.css'
})
export class PendientesComponent {
  pendientes: Array<intPendiente> = []

  constructor(private pendienteServicio: PendientesService){}

  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.pendienteServicio.mostrarPendientes().subscribe({
      next: (pendientes) => {
        this.pendientes = pendientes
        console.log(pendientes)
      },
      error: (error) => console.error("Error al mostrar los pendientes: "+error)
    })
  }
}
