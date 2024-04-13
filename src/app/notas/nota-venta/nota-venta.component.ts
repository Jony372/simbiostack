import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VentaService } from '../../services/venta/venta.service';
import { intProductoVenta, intVenta } from '../../services/venta/ventaInterface';
import { intProducto } from '../../services/productos/productoInterface';

@Component({
  selector: 'app-nota-venta',
  standalone: true,
  imports: [],
  templateUrl: './nota-venta.component.html',
  styleUrl: './nota-venta.component.css'
})
export class NotaVentaComponent {
  productos!: Array<intProductoVenta>
  venta!: intVenta

  constructor(private ventaServicio: VentaService, private route: ActivatedRoute){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let folio = this.route.snapshot.queryParamMap.get('folio') as string;
    console.log(folio)
    this.ventaServicio.mostrarVenta(parseInt(folio, 10)).subscribe({
      next: data => {
        this.venta = data;
      },
      error: err => console.error('Error al obtener la nota del equipo: '+err),
      complete: ()=> {
        print()
        window.addEventListener('afterprint', ()=> window.close())
      }
    })
    this.ventaServicio.mostrarVentaProducto(parseInt(folio, 10)).subscribe({
      next: data => {
        this.productos = data;
        console.log(data)
      },
      error: err => console.error('Error al obtener los productos de la nota de venta: '+err)
    })
  }

  formattedTotal(n: number): string {
    return n.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

}
