import { Component, EventEmitter, Output } from '@angular/core';
import { intPrioridad } from '../../../../services/prioridad/interfazPrioridad';
import { intEstado } from '../../../../services/estado/interfazEstado';
import { PrioridadService } from '../../../../services/prioridad/prioridad.service';
import { EstadoService } from '../../../../services/estado/estado.service';

@Component({
  selector: 'app-dropdowns',
  standalone: true,
  imports: [],
  templateUrl: './dropdowns.component.html',
  styleUrl: './dropdowns.component.css'
})
export class DropdownsComponent {
  @Output() seleccion = new EventEmitter<Array<number>>() 
  prioridades!: Array<intPrioridad>
  estados!: Array<intEstado>

  constructor(private prioridadServicio: PrioridadService, private estadoServicio: EstadoService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.prioridadServicio.mostrar().subscribe({
      next: data => this.prioridades = data,
      error: error => console.error("Error al mostrar las prioridades: "+error)
    })

    this.estadoServicio.mostrarEstados().subscribe({
      next: data => this.estados = data,
      error: error => console.error("Error al mostrar los estados: "+error)
    })
  }

  select(sel: Array<number>){
    this.seleccion.emit(sel);
  }

}
