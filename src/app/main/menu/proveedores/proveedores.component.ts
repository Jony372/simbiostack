import { Component } from '@angular/core';
import { ClienteService } from '../../../services/clientes/cliente.service';
import { intCliente } from '../../../services/clientes/clienteInterfaz';
import { AddClientesComponent } from '../modales/add-clientes/add-clientes.component';
import { intProveedor } from '../../../services/proveedor/interfazProveedor';
import { ProveedorService } from '../../../services/proveedor/proveedor.service';
import { Toast } from '../../../../assets/const';
import { Modal, ModalInterface } from 'flowbite';
import { AddProveedoresComponent } from '../modales/add-proveedores/add-proveedores.component';
import { ConfirmarComponent } from '../modales/confirmar/confirmar.component';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [AddProveedoresComponent, ConfirmarComponent],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {
  add : boolean = true;
  proveedor!:intProveedor|undefined;
  proveedores!:Array<intProveedor>
  modal!: ModalInterface;
  modalConfirmar!: ModalInterface;
  eProvedor!: intProveedor;

  constructor(private proveedorServicio:ProveedorService){}

  ngOnInit(): void {
    this.actualizar();
  }
  
  actualizar(){
    this.modal = new Modal(document.getElementById('add-proveedor'));
    this.modalConfirmar = new Modal(document.getElementById('confirmar-modal'))

    this.proveedorServicio.proveedores().subscribe({
      next:(response)=>this.proveedores = response,
      error:error =>  {
        console.error('Ocurrió un error al mostrar los proveedores: '+error);
        Toast.fire({
          icon: 'error',
          title: 'Error al mostrar los proveedores: ' + error
        })
      }
    })
  }

  eliminar(){
    this.proveedorServicio.eliminarProveedor(this.eProvedor.id).subscribe({
      next: data => Toast.fire({
        icon: 'success',
        title: data.mensaje
      }),
      error: err=>{
        console.error('Ocurrió un error al eliminar el proveedor: '+err);
        Toast.fire({
          icon: 'error',
          title: 'Error al eliminar el proveedor: ' + err
        })
      },
      complete: ()=>{
        this.actualizar();
      }
    })
  }

  editar(proveedor:intProveedor){
    this.add = false;
    this.proveedor = proveedor;
    this.modal.show();
  }

  agregar(){
    this.add=true;
    this.proveedor = undefined;
    this.modal.show();
  }

  eliminarProveedor(pr: intProveedor){
    this.eProvedor = pr;
    this.modalConfirmar.show();
  }
}
