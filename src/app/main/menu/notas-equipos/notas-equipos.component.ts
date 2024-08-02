import { Component } from '@angular/core';
import { intPendiente } from '../../../services/pendientes/pendientesInterface';
import { PendientesService } from '../../../services/pendientes/pendientes.service';
import { AddPendienteComponent } from '../modales/add-pendiente/add-pendiente.component';
import { Modal, ModalInterface } from 'flowbite';
import { Toast } from '../../../../assets/const';
import { intGetNotaEquipos, intNotaEquipo } from '../../../services/notas/interfazNota';
import { NotasService } from '../../../services/notas/notas.service';

@Component({
  selector: 'app-notas-equipos',
  standalone: true,
  imports: [AddPendienteComponent],
  templateUrl: './notas-equipos.component.html',
  styleUrl: './notas-equipos.component.css'
})
export class NotasEquiposComponent {
  notas: Array<intGetNotaEquipos> = []
  add : boolean = true;
  notaEquipo!:intGetNotaEquipos|undefined;

  constructor(private notaService: NotasService){}

  ngOnInit(){
    this.actualizar();
  }

  actualizar(){
    this.notaService.obtenerNotas().subscribe({
      next: (data) => {
        this.notas = data.reverse()
      },
      error: (error) => {
        Toast.fire({
          icon: 'error',
          title: "Error al mostrar los pendientes: " + error
        })
      }
    })
  }


  accion(id: number, op: number){
    this.notaService.cambiarEstado(id, op).subscribe({
      next: data => Toast.fire({
        icon: 'success',
        title: data.mensaje
      }),
      error: err => Toast.fire({
        icon: 'error',
        title: 'Error al realizar la acción: ' + err
      }),
      complete: () => this.actualizar()
    })
  }

  abrir(id: number){
    window.open(`nota-equipo?folio=${id}`)
  }

}
