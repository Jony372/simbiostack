import { Component } from '@angular/core';
import { Modal, ModalInterface } from 'flowbite';
import { Toast } from '../../../../assets/const';
import { intProductoCompra } from '../../../services/compra/compraInterface';
import { intProducto } from '../../../services/productos/productoInterface';
import { ProductosService } from '../../../services/productos/productos.service';
import { intProveedor } from '../../../services/proveedor/interfazProveedor';
import { ProveedorService } from '../../../services/proveedor/proveedor.service';
import { VentaService } from '../../../services/venta/venta.service';
import { VentaComponent } from '../modales/venta/venta.component';
import { PcEncabezadoComponent } from './pc-encabezado/pc-encabezado.component';
import { PcTablaComponent } from './pc-tabla/pc-tabla.component';
import { CompraService } from '../../../services/compra/compra.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-p-compra',
  standalone: true,
  imports: [PcEncabezadoComponent, PcTablaComponent, VentaComponent],
  templateUrl: './p-compra.component.html',
  styleUrl: './p-compra.component.css'
})
export class PCompraComponent {
  proveedores!: Array<intProveedor>;
  productos!: Array<intProducto>;
  producto!: intProducto;
  proveedor!: intProveedor;
  prodCompra: Array<intProductoCompra> = [];
  modal!: ModalInterface;
  total: number = 0;

  formattedTotal(n: number): string {
    return n.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  constructor(private router: Router ,private proveedorServicio: ProveedorService, private productoServicio: ProductosService, private compraServicio: CompraService){
  }

  ngOnInit(){
    this.actualizar()
  }
  
  actualizar() {
    const modalHtml = document.getElementById('venta-modal');
    this.modal = new Modal(modalHtml);
    
    this.proveedorServicio.proveedores().subscribe({
      next: data => this.proveedores = data,
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

  addProveedor(proveedor: intProveedor){
    this.proveedor = proveedor;
  }
  actionModal(){
    if (this.proveedor && this.prodCompra.length > 0) {
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
        title: this.proveedor?'Agregue algún producto a la compra':'Seleccione un proveedor'
      })
    }
  }

  pago(evt: number[]){
    const estado = evt;
    console.log(estado)
    this.compraServicio.addCompra(this.total, this.proveedor.id, evt[1]).subscribe({
      next: data => {
        console.log(data)
        this.prodCompra.forEach((prod, i) => {
          this.compraServicio.addCompraProducto(prod?.producto?.id, data.id, prod.cantidad, prod.precio, prod.subTotal, prod.nombre).subscribe({
            error: err => console.error("Error al agregar el producto: "+err),
            complete: () => {
              if (i == this.prodCompra.length - 1){
                window.open(`http://localhost:4200/nota-compra?folio=${data.id}`)
                window.location.reload();
              }
              console.log("Compra realizada")
            }
          })
        });
      },
      error: err => console.error("Error al agregar la venta: "+err),
    })
  }
}
