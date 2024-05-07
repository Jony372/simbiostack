import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { format } from '../../../../assets/const';
import { intProducto } from '../../../services/productos/productoInterface';
import { intServicios } from '../../../services/servicios/interfazServicios';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { AddServicioComponent } from '../modales/add-servicio/add-servicio.component';


@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [DataTablesModule, HttpClientModule, CommonModule, RouterOutlet, ReactiveFormsModule, AddServicioComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  servicios!: Array<intServicios>;
  add: boolean = false;
  servicio!: intServicios|undefined;
  
  format = format

  search = this.forms.group({
    palabras:['']
  })

  productos: Array<intProducto> = [];

  constructor(private forms: FormBuilder, private serviciosServicio:ServiciosService){
  }

  ngOnInit(): void{
    this.serviciosServicio.servicios().subscribe({
      next: data => {
        data.sort((a, b)=> a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()))
        this.servicios = data
      },
      error: err => alert("Hubo un error al mostrar los servicios"+ err)
    })
    
  }


  eliminar(id:number){
    this.serviciosServicio.eliminarServicio(id).subscribe({
      next:(data)=>{
        console.log(data)
      },error:(err)=>{
        console.error("Error al eliminar el producto: "+err)
      }, complete: () => {
        this.servicios = this.servicios.filter(serv => serv.id != id);
        // window.location.reload()
      }
    })
  }

  editar(servicio: intServicios){
    this.add=false;
    this.servicio = servicio;
  }

  agregar(){
    this.add= true;
    this.servicio = undefined;
  }
}

