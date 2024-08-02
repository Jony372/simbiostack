import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GraficaComponent } from './grafica/grafica.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddProductoComponent } from '../modales/add-producto/add-producto.component';
import { intProducto } from '../../../services/productos/productoInterface';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../../../services/productos/productos.service';
import { Modal, ModalInterface } from 'flowbite';
import { ConfirmarComponent } from '../modales/confirmar/confirmar.component';
import { Toast } from '../../../../assets/const';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [GraficaComponent, DataTablesModule, HttpClientModule, CommonModule, RouterOutlet, AddProductoComponent, ReactiveFormsModule, FormsModule, ConfirmarComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  add: boolean = false;
  prod!: intProducto|undefined;
  opcion: number = 3;
  modal!: ModalInterface;
  modalConfirmar!: ModalInterface;
  eliminarProducto!: intProducto;

  search = this.forms.group({
    palabras:['']
  })

  productos: Array<intProducto> = [];

  constructor(private forms: FormBuilder, private productoServicio:ProductosService){
  }

  ngOnInit() {
    this.actualizar();
  }

  actualizar(): void{
    this.modal = new Modal(document.getElementById('add-producto'))
    this.modalConfirmar = new Modal(document.getElementById('confirmar-modal'))

    this.productoServicio.obtenerProductos().subscribe({
      next: data => {
        data.sort((a, b)=> a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()))
        this.productos = data
      },
      error: err => alert("Hubo un error "+ err)
    })
    
  }

  eliminar(){
    this.productoServicio.eliminarProducto(this.eliminarProducto.id).subscribe({
      next:(data)=>{
        Toast.fire({
          icon: 'success',
          title: data.mensaje
        })
      },error:(err)=>{
        Toast.fire({
          icon: 'error',
          title: 'Error al eliminar el producto: '+err
        })
      }, complete: () => {
        this.actualizar();
      }
    })
  }

  editar(prod:intProducto){
    this.add=false;
    this.prod = prod;
    this.modal.show();
  }

  agregar(){
    this.add= true;
    this.prod = undefined;
    this.modal.show();
  }

  selectCancelar(id: intProducto){
    this.eliminarProducto = id;
    this.modalConfirmar.show();
  }
}

