import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VentaService } from '../../services/venta/venta.service';
import { intProductoVenta, intVenta } from '../../services/venta/ventaInterface';
import { format } from '../../../assets/const';
import { intEntregaServicio, intNotaEntrega } from '../../services/entrega/notaEntregaInterface';
import { NotasService } from '../../services/notas/notas.service';
import { EntregaService } from '../../services/entrega/entrega.service';

@Component({
  selector: 'app-nota-venta',
  standalone: true,
  imports: [],
  templateUrl: './nota-entrega.component.html',
  styleUrl: './nota-entrega.component.css'
})
export class NotaEntregaComponent {
  productos!: Array<intEntregaServicio>
  nota!: intNotaEntrega

  format = format;

  constructor(private entregaServicio: EntregaService, private route: ActivatedRoute){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let folio = this.route.snapshot.queryParamMap.get('folio') as string;
    console.log(folio)
    this.entregaServicio.obtenerNota(parseInt(folio, 10)).subscribe({
      next: data => {
        this.nota = data;
        console.log(data)
      },
      error: err => console.error('Error al obtener la nota del equipo: '+err)
    })
    this.entregaServicio.getEntregaServicio(parseInt(folio, 10)).subscribe({
      next: data => {
        this.productos = data;
        console.log(data)
      },
      error: err => console.error('Error al obtener los productos de la nota de venta: '+err),
      complete: ()=> {
        print()
        window.addEventListener('afterprint', ()=> window.close())
      }
    })
  }

}
