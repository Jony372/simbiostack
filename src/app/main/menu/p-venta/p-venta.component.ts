import { Component } from '@angular/core';
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


@Component({
  selector: 'app-p-venta',
  standalone: true,
  imports: [PvEncabezadoComponent, PvTablaComponent, VentaComponent],
  templateUrl: './p-venta.component.html',
  styleUrl: './p-venta.component.css'
})
export class PVentaComponent {
  clientes!: Array<intCliente>;
  productos!: Array<intProducto>;
  producto!: intProducto;
  cliente!: intCliente;
  prodVenta: Array<intProductoVenta> = [];
  modal!: ModalInterface;

  total!: number;

  formattedTotal(n: number): string {
    return n.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  constructor(private clienteServicio: ClienteService, private productoServicio: ProductosService, private ventaServicio: VentaService){
    this.total = 0;
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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
      // Swal.fire({
      //   title: 'Realizar venta',
      //   text: '¿Desea realizar la venta?',
      //   input: 'checkbox',
      //   inputPlaceholder: 'Pagado',
      //   icon: 'question',
      //   confirmButtonText: 'Pagar',
      //   showCancelButton: true,
      //   cancelButtonText: 'Cancelar'
      // }).then((result) => {
      //   console.log(result)
      //   if(result.isConfirmed && this.cliente && this.prodVenta.length > 0){
      //     this.ventaServicio.agregarVenta(1, this.cliente.id, this.total, 4, 6).subscribe({
      //       next: data => {
      //         this.prodVenta.forEach((prod, i) => {
      //           this.ventaServicio.agregarVentaProducto(data.id, prod.producto.id, prod.cantidad, prod.subTotal, prod.producto.precio).subscribe({
      //             error: err => console.error("Error al agregar el producto: "+err),
      //             complete: () => {
      //               if (i == this.prodVenta.length - 1){
      //                 window.open(`http://localhost:4200/nota-venta?folio=${data.id}`)
      //                 window.location.reload();
      //               }
      //             }
      //           })
      //         });
      //       },
      //       error: err => console.error("Error al agregar la venta: "+err),
      //     })
      //   }else if(result.isConfirmed){
      //     Swal.fire({
      //       title: 'Error',
      //       text: 'Faltan datos por llenar',
      //       icon: 'warning',
      //       confirmButtonText: 'Aceptar',
      //       color: '#fff',
      //       background: '#374151'
      //     })
      //   }
      // })



    }else{
      Toast.fire({
        icon: 'error',
        title: 'Faltan datos por llenar'
      })
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
