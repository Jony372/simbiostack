import { Component } from '@angular/core';
import { Modal, ModalInterface } from 'flowbite';
import { format } from '../../../../assets/const';
import { intGetNotaEquipos } from '../../../services/notas/interfazNota';
import { NotasService } from '../../../services/notas/notas.service';
import { PendientesService } from '../../../services/pendientes/pendientes.service';
import { intPendiente } from '../../../services/pendientes/pendientesInterface';
import { intProducto } from '../../../services/productos/productoInterface';
import { ProductosService } from '../../../services/productos/productos.service';
import { VentaService } from '../../../services/venta/venta.service';
import { intVenta } from '../../../services/venta/ventaInterface';
import { NotaModalComponent } from '../modales/nota-modal/nota-modal.component';
import { PendientesModalComponent } from '../modales/pendientes-modal/pendientes-modal.component';
import { VentaComponent } from '../modales/venta/venta.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [VentaComponent, PendientesModalComponent, NotaModalComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  pendientes: Array<any> = [];
  productos: Array<intProducto>=[];
  porPagar: Array<intVenta>=[];
  pendiente!: intPendiente;
  nota!: intGetNotaEquipos;
  venta!: number;
  total: number = 0;
  modal!: ModalInterface;
  pendienteModal!: ModalInterface;
  notaModal!: ModalInterface;

  format = format;

  constructor(private notaServicio: NotasService ,private pendServ: PendientesService, private productoServicio: ProductosService, private ventaServicio:VentaService) {}

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
    
    this.ventaServicio.mostrarVentasPorCobrar().subscribe({
      next: data => this.porPagar = data,
      error: (errorMessage)=> {
        alert("ERROR")
        console.error(errorMessage);
      }
    })

    this.modal = new Modal(document.getElementById('venta-modal'));
    this.pendienteModal = new Modal(document.getElementById('pendientes-modal'));
    this.notaModal = new Modal(document.getElementById('nota-modal'));
  }

  pago(evt: number){
    console.log(this.venta)
    this.ventaServicio.pagarVenta(this.venta).subscribe({
      error: (err) => console.error("Error al pagar: ", err),
      complete: () => {window.location.reload()}
    })
  }

  pagar(venta:intVenta){
    this.total = venta.total;
    this.venta = venta.id;
    this.modal.show();
  }

  seleccionarPendiente(id:number, tipo: number){
    if(tipo === 1){
      this.pendServ.getPendiente(id).subscribe({
        next: (data) => this.pendiente = data,
        error: (err) => console.error("Error al seleccionar el pendiente: "+err),
        complete: () => this.pendienteModal.show()
      })
    }else{
      this.notaServicio.getNota(id).subscribe({
        next: (data) => this.nota = data,
        error: (err) => console.error("Error al seleccionar la nota: "+err),
        complete: () => this.notaModal.show()
      })
    }
  }

  actualizar(){
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
  }
}
