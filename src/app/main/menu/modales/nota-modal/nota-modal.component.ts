import { Component, EventEmitter, Input, Output } from '@angular/core';
import { intGetNotaEquipos } from '../../../../services/notas/interfazNota';
import { DropdownsComponent } from '../dropdowns/dropdowns.component';
import { intEstado } from '../../../../services/estado/interfazEstado';
import { EstadoService } from '../../../../services/estado/estado.service';
import { intPrioridad } from '../../../../services/prioridad/interfazPrioridad';
import { PrioridadService } from '../../../../services/prioridad/prioridad.service';
import { NotasService } from '../../../../services/notas/notas.service';
import { Toast } from '../../../../../assets/const';

@Component({
  selector: 'app-nota-modal',
  standalone: true,
  imports: [DropdownsComponent],
  templateUrl: './nota-modal.component.html',
  styleUrl: './nota-modal.component.css'
})
export class NotaModalComponent {
  @Output() save = new EventEmitter<any>;
  @Input() nota!: intGetNotaEquipos;
  estados!: Array<intEstado>
  prioridades!: Array<intPrioridad>
  estado!: number;
  prioridad!: number;
  guardar: boolean = false;
  boton: string = "Cerrar";

  constructor(private estadoServicio: EstadoService, private prioridadServicio: PrioridadService, private notaServicio: NotasService) {}

  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.estadoServicio.mostrarEstados().subscribe({
      next: data => this.estados = data,
      error: error => console.error("Error al mostrar los estados: "+error)
    })

    this.prioridadServicio.mostrar().subscribe({
      next: data => this.prioridades = data,
      error: error => console.error("Error al mostrar las prioridades: "+error)
    })
  }

  ngOnChanges(){
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.estado = this.nota.estado.id;
    this.prioridad = this.nota.prioridad.id;
  }

  select(sel: Array<number>){
    const id = sel[0];
    if(sel[1] === 1){
      const estado = this.estados.find(estado => estado.id === id)
      this.nota.estado = estado as intEstado;
    }else{
      const prioridad = this.prioridades.find(prioridad => prioridad.id === id)
      this.nota.prioridad = prioridad as intPrioridad;
    }
    this.cambio();
  }

  cambio(){
    this.guardar = this.estado !== this.nota.estado.id || this.prioridad !== this.nota.prioridad.id;
    this.boton = this.guardar ? "Guardar" : "Cerrar";
  }

  modificar(){
    if(this.guardar){
      this.notaServicio.modificarEstado(this.nota.id, this.nota.estado.id, this.nota.prioridad.id).subscribe({
        error: error => console.error("Error al modificar la nota: "+error),
        complete: () => {
          Toast.fire({
            icon: 'success',
            title: 'Nota modificada'
          })
          this.save.emit();
        }
      })
    }
  }
}
