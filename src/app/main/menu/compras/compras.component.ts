import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { format } from '../../../../assets/const';
import { CompraService } from '../../../services/compra/compra.service';
import { intCompra } from '../../../services/compra/compraInterface';

@Component({
  selector: 'app-pendientes',
  standalone: true,
  imports: [],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent {
  compras: Array<intCompra> = []
  format = format

  constructor(private compraServicio: CompraService){}

  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.compraServicio.getCompras().subscribe({
      next: (data) => {
        this.compras = data
      },
      error: (error) => console.error("Error al mostrar los pendientes: "+error)
    })
  }

  abrir(id: number){
    window.open(`nota-compra?folio=${id}`)
  }
}
