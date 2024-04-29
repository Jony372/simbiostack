import { Component } from '@angular/core';
import { Modal, ModalInterface } from 'flowbite';
import { Toast, format } from '../../../../assets/const';
import { ClienteService } from '../../../services/clientes/cliente.service';
import { intCliente } from '../../../services/clientes/clienteInterfaz';
import { intProducto } from '../../../services/productos/productoInterface';
import { ProductosService } from '../../../services/productos/productos.service';
import { VentaService } from '../../../services/venta/venta.service';
import { intProductoVenta } from '../../../services/venta/ventaInterface';
import { VentaComponent } from '../modales/venta/venta.component';
import { PvTablaComponent } from '../p-venta/pv-tabla/pv-tabla.component';
import { PveEncabezadoComponent } from './pve-encabezado/pve-encabezado.component';
import { intNotaEquipo } from '../../../services/notas/interfazNota';
import { NotasService } from '../../../services/notas/notas.service';

@Component({
  selector: 'app-pv-entrega',
  standalone: true,
  imports: [PvTablaComponent, PveEncabezadoComponent, VentaComponent],
  templateUrl: './pv-entrega.component.html',
  styleUrl: './pv-entrega.component.css'
})
export class PvEntregaComponent {
  clientes!: Array<intCliente>;
  productos!: Array<intProducto>;
  notas!: Array<intNotaEquipo>;
  prodVenta: Array<intProductoVenta> = [];
  cliente!: intCliente;
  total: number = 0;
  modal!: ModalInterface;
  nota!: intNotaEquipo;

  format = format;

  constructor(private notaServicio: NotasService ,private ventaServicio: VentaService, private clienteServicio: ClienteService, private productoServicio: ProductosService){}

  ngOnInit(){

    const modalHtml = document.getElementById('venta-modal');
    this.modal = new Modal(modalHtml);
    
    this.clienteServicio.mostrar().subscribe({
      next: data => this.clientes = data,
      error: err => console.error("Error al cargar los clientes: "+err)
    })
    this.productoServicio.obtenerProductos().subscribe({
      next: data => this.productos = data,
      error: err => console.error("Error al mostrar los productos: "+err)
    })
    this.notaServicio.obtenerNotas().subscribe({
      next: data => this.notas = data,
      error: err => console.error("Error al mostrar las notas: "+err)
    })
  }

  addCliente(cliente: intCliente){
    this.cliente = cliente;
  }

  addNota(nota: intNotaEquipo){
    this.nota = nota;
  }

  sumTotal(cant: number){
    this.total += cant;
  }

  actionModal(){
    if (this.cliente && this.prodVenta.length > 0) {
      this.modal.show()
    }else{
      Toast.fire({
        icon: 'error',
        title: 'Faltan datos por llenar'
      })
      console.log(this.cliente)
    }
  }

  pago(evt: number){
    const estado = evt;
    console.log(estado)
    this.ventaServicio.agregarVenta(1, this.cliente.id, this.total, 4, estado).subscribe({
      next: data => {
        console.log(data)
        this.prodVenta.forEach((prod, i) => {
          this.ventaServicio.agregarVentaProducto(data.id, prod.producto?.id, prod.cantidad, prod.subTotal, prod.precio, prod.productoNombre).subscribe({
            error: err => console.error("Error al agregar el producto: "+err),
            complete: () => {
              if (i == this.prodVenta.length - 1){
                window.open(`http://localhost:4200/nota-venta?folio=${data.id}`)
                window.location.reload();
              }
              console.log("Venta realizada")
            }
          })
        });
      },
      error: err => console.error("Error al agregar la venta: "+err),
    })
  }

}
