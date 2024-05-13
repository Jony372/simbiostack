import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Toast, format } from '../../../../assets/const';
import { intProducto } from '../../../services/productos/productoInterface';
import { intServicios } from '../../../services/servicios/interfazServicios';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { AddServicioComponent } from '../modales/add-servicio/add-servicio.component';
import { Modal, ModalInterface } from 'flowbite';
import { ConfirmarComponent } from '../modales/confirmar/confirmar.component';


@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [DataTablesModule, HttpClientModule, CommonModule, RouterOutlet, ReactiveFormsModule, AddServicioComponent, ConfirmarComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  servicios!: Array<intServicios>;
  add: boolean = false;
  servicio!: intServicios|undefined;
  modal!: ModalInterface;
  modalConfirmar!: ModalInterface;
  eServicio!: intServicios;
  
  format = format


  constructor(private forms: FormBuilder, private serviciosServicio:ServiciosService){
  }

  ngOnInit(){
    this.actualizar();
  }

  actualizar(){
    this.modal = new Modal(document.getElementById('add-servicio'));
    this.modalConfirmar = new Modal(document.getElementById('confirmar-modal'));

    this.serviciosServicio.servicios().subscribe({
      next: data => {
        data.sort((a, b)=> a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()))
        this.servicios = data
      },
      error: err => alert("Hubo un error al mostrar los servicios"+ err)
    })
  }


  eliminar(){
    this.serviciosServicio.eliminarServicio(this.eServicio.id).subscribe({
      next:(data)=>{
        Toast.fire({
          icon: data.status === 200? 'success':'warning',
          title: data.mensaje
        })
      },error:(err)=>{
        Toast.fire({
          icon: 'error',
          title: 'Error al eliminar el servicio ' + err
        })
      }, complete: () => {
        this.actualizar();
      }
    })
  }

  editar(servicio: intServicios){
    this.add=false;
    this.servicio = servicio;
    this.modal.show();
  }

  agregar(){
    this.add= true;
    this.servicio = undefined;
    this.modal.show()
  }

  selectServicio(s: intServicios){
    this.eServicio = s;
    this.modalConfirmar.show();
  }
}

