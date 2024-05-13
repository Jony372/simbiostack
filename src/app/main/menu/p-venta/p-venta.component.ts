import { Component, inject } from '@angular/core';
import { Modal, ModalInterface } from 'flowbite';
import { Toast } from '../../../../assets/const';
import { ClienteService } from '../../../services/clientes/cliente.service';
import { intCliente } from '../../../services/clientes/clienteInterfaz';
import { intProducto } from '../../../services/productos/productoInterface';
import { ProductosService } from '../../../services/productos/productos.service';
import { VentaService } from '../../../services/venta/venta.service';
import { intProductoVenta } from '../../../services/venta/ventaInterface';
import { VentaComponent } from '../modales/venta/venta.component';
import { PvEncabezadoComponent } from './pv-encabezado/pv-encabezado.component';
import { PvTablaComponent } from './pv-tabla/pv-tabla.component';
import { CookieService } from 'ngx-cookie-service';
import { userInt } from '../../../services/login/userInterface';
import { AddClientesComponent } from '../modales/add-clientes/add-clientes.component';


@Component({
  selector: 'app-p-venta',
  standalone: true,
  imports: [PvEncabezadoComponent, PvTablaComponent, VentaComponent, AddClientesComponent],
  templateUrl: './p-venta.component.html',
  styleUrl: './p-venta.component.css'
})
export class PVentaComponent {
  cookieService = inject(CookieService);

  clientes!: Array<intCliente>;
  productos!: Array<intProducto>;
  producto!: intProducto;
  cliente!: intCliente;
  prodVenta: Array<intProductoVenta> = [];
  modal!: ModalInterface;
  total: number = 0;

  formattedTotal(n: number): string {
    return n.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  constructor(private clienteServicio: ClienteService, private productoServicio: ProductosService, private ventaServicio: VentaService){
    this.total = 0;
  }

  ngOnInit(){
    this.actualizar()
  }

  actualizar(): void {
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
    this.formattedTotal;
  }

  sumTotal(cant: number){
    this.total += cant;
  }

  addCliente(cliente: intCliente){
    this.cliente = cliente;
  }
  actionModal(){
    if (this.cliente && this.prodVenta.length > 0) {
      this.modal.show()
    }else{
      Toast.fire({
        icon: 'error',
        title: this.cliente?'Agregue algún producto':'Agregue un cliente'
      })
    }
  }

  pago(evt: number[]){
    const estado = evt;
    const usuario = JSON.parse(this.cookieService.get('user')) as userInt;
    this.ventaServicio.agregarVenta(usuario.id, this.cliente.id, this.total, estado[0], estado[1]).subscribe({
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
