import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GraficaComponent } from './grafica/grafica.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddProductoComponent } from '../modales/add-producto/add-producto.component';
import { intProducto } from '../../../services/productos/productoInterface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../../../services/productos/productos.service';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [GraficaComponent, DataTablesModule, HttpClientModule, CommonModule, RouterOutlet, AddProductoComponent, ReactiveFormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  add: boolean = false;
  prod!: intProducto|undefined;

  search = this.forms.group({
    palabras:['']
  })

  productos: Array<intProducto> = [];

  constructor(private forms: FormBuilder, private productoServicio:ProductosService){
  }

  ngOnInit(): void{
    this.productoServicio.obtenerProductos().subscribe({
      next: data => {
        data.sort((a, b)=> a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()))
        this.productos = data
      },
      error: err => alert("Hubo un error "+ err)
    })
    
  }

  buscar(){
    // let form = this.search
    // let palabra:string = form.value.palabras || "";
    // this.productos = this.productos.filter(prod => prod.codigobarra.includes(palabra) || prod.nombre.includes(palabra) || prod.categoria.nombre.includes(palabra))
    
  }

  eliminar(id:number){
    this.productoServicio.eliminarProducto(id).subscribe({
      next:(data)=>{
        console.log(data)
      },error:(err)=>{
        console.error("Error al eliminar el producto: "+err)
      }, complete: () => {
        this.productos = this.productos.filter(prod => prod.id != id);
        // window.location.reload()
      }
    })
  }

  editar(prod:intProducto){
    this.add=false;
    this.prod = prod;
  }

  agregar(){
    this.add= true;
    this.prod = undefined;
  }
}

