import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Modal, ModalInterface } from 'flowbite';
import { Toast, format } from '../../../../assets/const';
import { intCliente } from '../../../services/clientes/clienteInterfaz';
import { VentaService } from '../../../services/venta/venta.service';
import { intVenta } from '../../../services/venta/ventaInterface';
import { ConfirmarComponent } from '../modales/confirmar/confirmar.component';
import { VentaComponent } from '../modales/venta/venta.component';
import { intEntregaServicio, intNotaEntrega } from '../../../services/entrega/notaEntregaInterface';
import { EntregaService } from '../../../services/entrega/entrega.service';

@Component({
  selector: 'app-pendientes',
  standalone: true,
  imports: [ConfirmarComponent, ReactiveFormsModule, FormsModule, VentaComponent],
  templateUrl: './entregas.component.html',
  styleUrl: './entregas.component.css'
})
export class EntregasComponent {
  entregas: Array<intNotaEntrega> = []
  canEntrega!: number;
  texto!: string;
  modal!: ModalInterface;
  modalAceptar!: ModalInterface;
  entrega!: intNotaEntrega;
  format = format

  constructor(private entregaServicio: EntregaService, private ventaServicio: VentaService){}

  ngOnInit(){
    this.actualizarDatos();
    

    this.modal = new Modal(document.getElementById('venta-modal'));
    this.modalAceptar = new Modal(document.getElementById('confirmar-modal'));
  }

  actualizarDatos(){
    this.entregaServicio.getNotasEntrega().subscribe({
      next: (data) => {
        this.entregas = data.sort((a, b) => b.id - a.id);
      },
      error: (error) => console.error("Error al mostrar los pendientes: "+error)
    })

  }

  cancelar(){
    this.entregaServicio.cancelarNota(this.canEntrega).subscribe({
      next: data => console.log(data),
      error: err => console.error("Error al cancelar la venta: "+err),
      complete: () => {
        this.actualizarDatos()
        Toast.fire({
          icon: 'success',
          title: 'Nota cancelada'
        })
      }
    })
  }

  search(){
    if(this.texto){
      this.entregaServicio.filtrar(this.texto).subscribe({
        next: data => this.entregas = data.reverse(),
        error: err => console.error("Error al filtrar las ventas: "+err)
      })
    }else{
      this.actualizarDatos();
    }
  }

  abrir(id: number){
    window.open(`nota-entrega?folio=${id}`)
  }

  pago(evt: number[]){
    this.ventaServicio.pagarVenta(this.entrega.id, 2, evt[1]).subscribe({
      error: (err) => console.error("Error al pagar: ", err),
      complete: () => {
        this.actualizarDatos()
        Toast.fire({
          icon: 'success',
          title: 'Venta pagada'
        })
      }
    })
  }

  selectVenta(can: boolean, entrega: intNotaEntrega){
    if (can) {
      this.entrega = entrega;
      this.modal.show();
    }
  }

  cancelarEntrega(entrega: number){
    this.canEntrega = entrega;
    this.modalAceptar.show();
  }
  
}
