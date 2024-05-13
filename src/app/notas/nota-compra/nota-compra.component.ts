import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VentaService } from '../../services/venta/venta.service';
import { intProductoVenta, intVenta } from '../../services/venta/ventaInterface';
import { format } from '../../../assets/const';
import { intCompra, intProductoCompra } from '../../services/compra/compraInterface';
import { CompraService } from '../../services/compra/compra.service';

@Component({
  selector: 'app-nota-venta',
  standalone: true,
  imports: [],
  templateUrl: './nota-compra.component.html',
  styleUrl: './nota-compra.component.css'
})
export class NotaCompraComponent {
  productos!: Array<intProductoCompra>
  compra!: intCompra

  format = format;

  constructor(private compraServicio: CompraService, private route: ActivatedRoute){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let folio = this.route.snapshot.queryParamMap.get('folio') as string;
    this.compraServicio.getCompra(parseInt(folio, 10)).subscribe({
      next: data => {
        this.compra = data;
      },
      error: err => console.error('Error al obtener la nota del equipo: '+err),
      complete: ()=> {
        print()
        window.addEventListener('afterprint', ()=> window.close())
      }
    })
    this.compraServicio.getComprasProductos(parseInt(folio, 10)).subscribe({
      next: data => {
        this.productos = data;
        console.log(data)
      },
      error: err => console.error('Error al obtener los productos de la nota de venta: '+err)
    })
  }

}
