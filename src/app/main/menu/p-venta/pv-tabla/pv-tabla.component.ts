import { Component, EventEmitter, Input, Output } from '@angular/core';
import { intProductoVenta } from '../../../../services/venta/ventaInterface';

@Component({
  selector: 'app-pv-tabla',
  standalone: true,
  imports: [],
  templateUrl: './pv-tabla.component.html',
  styleUrl: './pv-tabla.component.css'
})
export class PvTablaComponent {
  @Input() prodVenta!: Array<intProductoVenta>;
  @Output() sumTotal = new EventEmitter<any>;

  format(n: number): string {
    return n.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  eliminarProducto(prodVenta: intProductoVenta){
    const index = this.prodVenta.findIndex(pv => pv === prodVenta)
    this.prodVenta.splice(index, 1)
    this.sumTotal.emit(-prodVenta.subTotal)
  }
}
