import { Component } from '@angular/core';
import { Modal, ModalInterface } from 'flowbite';
import { CookieService } from 'ngx-cookie-service';
import { Toast, format } from '../../../../assets/const';
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
import { intCategoria } from '../../../services/categorias/categoriaInterfaz';
import { mostrarCategoria } from '../../../services/categorias/mostrarCategoria.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [VentaComponent, PendientesModalComponent, NotaModalComponent],
  providers: [CookieService],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  pendientes: Array<any> = [];
  gdl: Array<any> = [];
  categorias: Array<intCategoria>=[];
  porPagar: Array<any>=[];
  pendiente!: intPendiente;
  nota!: intGetNotaEquipos;
  venta!: number;
  total: number = 0;
  modal!: ModalInterface;
  pendienteModal!: ModalInterface;
  notaModal!: ModalInterface;
  tipo!: number;

  format = format;

  constructor(private notaServicio: NotasService ,private pendServ: PendientesService, private categoriaServicio: mostrarCategoria, private ventaServicio:VentaService) {}

  ngOnInit(){
    this.actualizarDatos()
  }
  ngOnChanges() {
    this.actualizarDatos()
  }

  actualizarDatos(){
    this.modal = new Modal(document.getElementById('venta-modal'));
    this.pendienteModal = new Modal(document.getElementById('pendientes-modal'));
    this.notaModal = new Modal(document.getElementById('nota-modal'));
    
    this.pendientes = [];
    this.gdl = [];
    this.pendServ.pendientes().subscribe({
      next:(data)=>{
        // console.log(data);
        data.forEach(pend => {
          pend[5] === 3? this.gdl.push(pend) : this.pendientes.push(pend);
        })
        // this.pendientes = data;
        // this.pendientes = data;
      },
      error: (errorMessage)=> {
        alert("ERROR")
        console.error(errorMessage);
      }
    });

    this.categoriaServicio.bajoStock().subscribe({
      next: data => {
        this.categorias = data
      },
      error: (errorMessage)=> {
        alert("ERROR")
        console.error("Error al mostrar el bajo stock: "+errorMessage);
      }
    })
    
    this.ventaServicio.mostrarVentasPorCobrar().subscribe({
      next: data => this.porPagar = data,
      error: (errorMessage)=> {
        alert("ERROR")
        console.error(errorMessage);
      }
    })
  }

  pago(evt: number[]){
    this.ventaServicio.pagarVenta(this.venta, this.tipo, evt[1]).subscribe({
      error: (err) => console.error("Error al pagar: ", err),
      complete: () => {this.actualizarDatos()}
    })
  }

  pagar(venta:any){
    this.total = venta[3];
    this.venta = venta[1];
    this.tipo = venta[0];
    this.modal.show();
  }

  seleccionarPendiente(id:number, tipo: number){
    if(tipo === 1){
      this.pendServ.getPendiente(id).subscribe({
        next: (data) => this.pendiente = data,
        error: (err) => {
          Toast.fire({
            icon: 'error',
            title: 'Error al seleccionar el pendiente ' + err
          })
        },
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

}
