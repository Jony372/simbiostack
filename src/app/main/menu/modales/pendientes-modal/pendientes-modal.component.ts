import { Component, EventEmitter, Input, Output } from '@angular/core';
import { intPendiente } from '../../../../services/pendientes/pendientesInterface';
import { ModalInterface } from 'flowbite';
import { intEstado } from '../../../../services/estado/interfazEstado';
import { intPrioridad } from '../../../../services/prioridad/interfazPrioridad';
import { EstadoService } from '../../../../services/estado/estado.service';
import { PrioridadService } from '../../../../services/prioridad/prioridad.service';
import { PendientesService } from '../../../../services/pendientes/pendientes.service';
import { Toast } from '../../../../../assets/const';

@Component({
  selector: 'app-pendientes-modal',
  standalone: true,
  imports: [],
  templateUrl: './pendientes-modal.component.html',
  styleUrl: './pendientes-modal.component.css'
})
export class PendientesModalComponent {
  @Output() save = new EventEmitter<any>;
  @Input() pendiente!: intPendiente;
  @Input() modal!: ModalInterface;
  estados!: Array<intEstado>
  prioridades!: Array<intPrioridad>
  estado!: number;
  prioridad!: number;
  guardar: boolean = false;
  boton: string = "Cerrar";
  

  constructor(private estadoServicio: EstadoService, private prioridadServicio: PrioridadService, private pendienteServicio: PendientesService) {}

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
    this.estado = this.pendiente?.estado.id;
    this.prioridad = this.pendiente?.prioridad.id;
    this.cambio();
  }

  select(sel: Array<number>){
    const id = sel[0];
    if(sel[1] === 1){
      const estado = this.estados.find(estado => estado.id === id)
      this.pendiente.estado = estado as intEstado;
    }else{
      const prioridad = this.prioridades.find(prioridad => prioridad.id === id)
      this.pendiente.prioridad = prioridad as intPrioridad;
    }
    this.cambio();
  }

  cambio(){
    this.guardar = this.estado !== this.pendiente?.estado.id || this.prioridad !== this.pendiente?.prioridad.id;
    this.boton = this.guardar ? "Guardar" : "Cerrar";
  }

  modificar(){
    if(this.guardar){
      this.pendienteServicio.modificarEstado(this.pendiente.id, this.pendiente.estado.id, this.pendiente.prioridad.id).subscribe({
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
    this.modal.hide()
  }
}
