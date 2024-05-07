import { Component, EventEmitter, Input, Output } from '@angular/core';
import { intProductoVenta } from '../../../../services/venta/ventaInterface';
import { intEntregaServicio } from '../../../../services/entrega/notaEntregaInterface';

@Component({
  selector: 'app-pve-tabla',
  standalone: true,
  imports: [],
  templateUrl: './pve-tabla.component.html',
  styleUrl: './pve-tabla.component.css'
})
export class PveTablaComponent {
  @Input() prodServEntrega!: Array<intEntregaServicio>;
  @Output() sumTotal = new EventEmitter<any>;

  format(n: number): string {
    return n.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  eliminarProducto(prodVenta: intEntregaServicio){
    const index = this.prodServEntrega.findIndex(pv => pv === prodVenta)
    this.prodServEntrega.splice(index, 1)
    this.sumTotal.emit(-prodVenta.subTotal)
  }
}
