import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, format } from '../../../../assets/const';
import { CompraService } from '../../../services/compra/compra.service';
import { intCompra } from '../../../services/compra/compraInterface';
import { FormsModule } from '@angular/forms';
import { ConfirmarComponent } from '../modales/confirmar/confirmar.component';
import { Modal, ModalInterface } from 'flowbite';

@Component({
  selector: 'app-pendientes',
  standalone: true,
  imports: [FormsModule, ConfirmarComponent],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent {
  compras: Array<intCompra> = []
  canCompra!: number;
  texto!: string;
  compra!: intCompra;
  modal!: ModalInterface;
  format = format

  constructor(private compraServicio: CompraService){}

  ngOnInit(){
    this.actualizarDatos();
  }

  actualizarDatos(){
    this.modal = new Modal(document.getElementById('confirmar-modal'))

    this.compraServicio.getCompras().subscribe({
      next: (data) => {
        this.compras = data.sort((a, b) => b.id - a.id);
      },
      error: (error) => console.error("Error al mostrar los pendientes: "+error)
    })

  }

  cancelar(){
    this.compraServicio.cancelarCompra(this.canCompra).subscribe({
      next: data => console.log(data),
      error: err => console.error("Error al cancelar la venta: "+err),
      complete: () => {
        this.actualizarDatos()
        Toast.fire({
          icon: 'success',
          title: 'Venta cancelada'
        })
      }
    })
  }

  search(){
    if(this.texto){
      this.compraServicio.filtrarCompra(this.texto).subscribe({
        next: data => this.compras = data.reverse(),
        error: err => console.error("Error al filtrar las ventas: "+err)
      })
    }else{
      this.actualizarDatos();
    }
  }

  confirmar(compra: intCompra){
    this.canCompra = compra.id;
    this.modal.show()
  }

  abrir(id: number){
    window.open(`nota-compra?folio=${id}`)
  }
  
}
