import { Component, EventEmitter, Input, Output } from '@angular/core';
import { intProductoVenta } from '../../../../services/venta/ventaInterface';
import { intProductoCompra } from '../../../../services/compra/compraInterface';

@Component({
  selector: 'app-pc-tabla',
  standalone: true,
  imports: [],
  templateUrl: './pc-tabla.component.html',
  styleUrl: './pc-tabla.component.css'
})
export class PcTablaComponent {
  @Input() prodCompra!: Array<intProductoCompra>;
  @Output() sumTotal = new EventEmitter<any>;

  format(n: number): string {
    return n.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  eliminarProducto(prodCompra: intProductoCompra){
    const index = this.prodCompra.findIndex(pv => pv === prodCompra)
    this.prodCompra.splice(index, 1)
    this.sumTotal.emit(-prodCompra.subTotal)
  }
}
