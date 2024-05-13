import { Component } from '@angular/core';
import { intPendiente } from '../../../services/pendientes/pendientesInterface';
import { PendientesService } from '../../../services/pendientes/pendientes.service';
import { AddPendienteComponent } from '../modales/add-pendiente/add-pendiente.component';
import { Modal, ModalInterface } from 'flowbite';
import { Toast } from '../../../../assets/const';

@Component({
  selector: 'app-pendientes',
  standalone: true,
  imports: [AddPendienteComponent],
  templateUrl: './pendientes.component.html',
  styleUrl: './pendientes.component.css'
})
export class PendientesComponent {
  pendientes: Array<intPendiente> = []
  add : boolean = true;
  pendiente!:intPendiente|undefined;
  modal!: ModalInterface;

  constructor(private pendienteServicio: PendientesService){}

  ngOnInit(){
    this.modal = new Modal(document.getElementById('add-pendiente'));
    this.actualizar();
  }

  actualizar(){
    this.pendienteServicio.mostrarPendientes().subscribe({
      next: (pendientes) => {
        this.pendientes = pendientes.reverse()
        console.log(pendientes)
      },
      error: (error) => console.error("Error al mostrar los pendientes: "+error)
    })
  }

  // eliminar(id:number){
  //   this.pendienteServicio.(id).subscribe({
  //     next:data=>console.log(data),
  //     error: err=>console.error("No se elimino: "+err),
  //     complete: ()=>{
  //       alert("Se elimino el cliente")
  //       this.clientes = this.clientes.filter(cli => cli.id != id);
  //     }
  //   })
  // }

  editar(pendiente:intPendiente){
    this.add = false;
    this.pendiente = pendiente;
    this.modal.show()
  }

  agregar(){
    this.add=true;
    this.pendiente = undefined;
    this.modal.show()
  }

  accion(id: number, op: number){
    console.log(id)
    this.pendienteServicio.cambiarEstado(id, op).subscribe({
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

}
