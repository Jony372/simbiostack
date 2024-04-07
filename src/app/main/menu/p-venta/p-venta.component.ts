import { Component } from '@angular/core';
import { PvEncabezadoComponent } from './pv-encabezado/pv-encabezado.component';
import { intCliente } from '../../../services/clientes/clienteInterfaz';
import { ClienteService } from '../../../services/clientes/cliente.service';
import { intProducto } from '../../../services/productos/productoInterface';
import { ProductosService } from '../../../services/productos/productos.service';
import { PvTablaComponent } from './pv-tabla/pv-tabla.component';
import { intProductoVenta } from '../../../services/venta/ventaInterface';
import { VentaService } from '../../../services/venta/venta.service';

@Component({
  selector: 'app-p-venta',
  standalone: true,
  imports: [PvEncabezadoComponent, PvTablaComponent],
  templateUrl: './p-venta.component.html',
  styleUrl: './p-venta.component.css'
})
export class PVentaComponent {
  clientes!: Array<intCliente>;
  productos!: Array<intProducto>;
  producto!: intProducto;
  cliente!: intCliente;
  prodVenta: Array<intProductoVenta> = [];

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

  pagar(){
    if (this.cliente && this.prodVenta.length > 0) {
      this.ventaServicio.agregarVenta(1, this.cliente.id, this.total, 4, 6).subscribe({
        next: data => {
          this.prodVenta.forEach((prod, i) => {
            this.ventaServicio.agregarVentaProducto(data.id, prod.producto.id, prod.cantidad, prod.total, prod.producto.precio).subscribe({
              next: data => console.log(i+" Producto agregado"),
              error: err => console.error("Error al agregar el producto: "+err),
              complete: () => {
                if (i == this.prodVenta.length - 1){
                  window.location.reload();
                  window.open(`http://localhost:4200/nota-equipo?folio=${data.id}`)
                }
              }
            })
          });
        },
        error: err => console.error("Error al agregar la venta: "+err),
      })
    }else{
      console.log("Seleccione un cliente")
    }
  }
}
