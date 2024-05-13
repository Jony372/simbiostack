import { Component } from '@angular/core';
import { ClienteService } from '../../../services/clientes/cliente.service';
import { intCliente } from '../../../services/clientes/clienteInterfaz';
import { AddClientesComponent } from '../modales/add-clientes/add-clientes.component';
import { Modal, ModalInterface } from 'flowbite';
import { ConfirmarComponent } from '../modales/confirmar/confirmar.component';
import { Toast } from '../../../../assets/const';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [AddClientesComponent, ConfirmarComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  add : boolean = true;
  cliente!:intCliente|undefined;
  clientes!:Array<intCliente>;
  modal!: ModalInterface;
  modalConfirmar!: ModalInterface;
  eliminarCliente!: intCliente;

  constructor(private clienteServicio:ClienteService){}

  ngOnInit(){
    this.actualizar();
  }
  
  actualizar(){
    this.modal = new Modal(document.getElementById('add-cliente'));
    this.modalConfirmar = new Modal(document.getElementById('confirmar-modal'));

    this.clienteServicio.mostrar().subscribe({
      next:(response)=>this.clientes = response,
      error:error =>  console.error('Ocurrió un error al mostrar los clientes: '+error)
    })
  }

  eliminar(){
    this.clienteServicio.eliminar(this.eliminarCliente.id).subscribe({
      next:data=>{
        Toast.fire({
          icon: data.status === 200 ?'success':'warning',
          title: data.mensaje
        })
      },
      error: err=>{
        Toast.fire({
          icon: 'error',
          title: 'Error al eliminar el cliente: ' + err.mensaje
        })
        console.log(err)
      },
      complete: ()=>{
        this.actualizar();
      }
    })
  }

  editar(cliente:intCliente){
    this.add = false;
    this.cliente = cliente;
    this.modal.show();
  }

  agregar(){
    this.add=true;
    this.cliente = undefined;
    this.modal.show();
  }

  elCli(cl: intCliente){
    this.eliminarCliente = cl;
    this.modalConfirmar.show();
  }
}
