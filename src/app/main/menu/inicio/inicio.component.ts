import { Component } from '@angular/core';
import { PendientesService } from '../../../services/pendientes/pendientes.service';
import { intPendiente } from '../../../services/pendientes/pendientesInterface';
import { ProductosService } from '../../../services/productos/productos.service';
import { intProducto } from '../../../services/productos/productoInterface';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  pendientes: Array<any> = [];
  productos: Array<intProducto>=[];

  constructor(private pendServ: PendientesService, private productoServicio: ProductosService) {}

  ngOnInit(){
    this.pendServ.pendientes().subscribe({
      next:(data)=>{
        // console.log(data);
        this.pendientes = data
        // this.pendientes  = data;
      },
      error: (errorMessage)=> {
        alert("ERROR")
        console.error(errorMessage);
      }
    });

    this.productoServicio.bajoStock().subscribe({
      next: data => {
        this.productos = data
      },
      error: (errorMessage)=> {
        alert("ERROR")
        console.error(errorMessage);
      }
    })
    
  }


}
