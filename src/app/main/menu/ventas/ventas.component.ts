import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Modal, ModalInterface } from 'flowbite';
import { Toast, format } from '../../../../assets/const';
import { VentaService } from '../../../services/venta/venta.service';
import { intVenta } from '../../../services/venta/ventaInterface';
import { ConfirmarComponent } from '../modales/confirmar/confirmar.component';
import { VentaComponent } from '../modales/venta/venta.component';

@Component({
  selector: 'app-pendientes',
  standalone: true,
  imports: [ConfirmarComponent, ReactiveFormsModule, FormsModule, VentaComponent],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {
  ventas: Array<intVenta> = []
  canVenta!: number;
  texto!: string;
  modal!: ModalInterface;
  modalAceptar!: ModalInterface;
  venta!: intVenta;
  format = format

  constructor(private ventaServicio: VentaService){}

  ngOnInit(){
    this.actualizarDatos();
  }
  
  
  actualizarDatos(){
    this.modal = new Modal(document.getElementById('venta-modal'));
    this.modalAceptar = new Modal(document.getElementById('confirmar-modal'))

    this.ventaServicio.mostrarVentas().subscribe({
      next: (data) => {
        this.ventas = data.sort((a, b) => b.id - a.id);
      },
      error: (error) => console.error("Error al mostrar los pendientes: "+error)
    })

  }

  confirmar(venta: intVenta){
    this.canVenta = venta.id;
    this.modalAceptar.show()
  }

  cancelar(){
    this.ventaServicio.cancelarVenta(this.canVenta).subscribe({
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
      this.ventaServicio.filtrarVentas(this.texto).subscribe({
        next: data => this.ventas = data.reverse(),
        error: err => console.error("Error al filtrar las ventas: "+err)
      })
    }else{
      this.actualizarDatos();
    }
  }

  abrir(id: number){
    window.open(`nota-venta?folio=${id}`)
  }

  pago(evt: number[]){
    this.ventaServicio.pagarVenta(this.venta.id, 1, evt[1]).subscribe({
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

  selectVenta(can: boolean, venta: intVenta){
    if (can) {
      this.venta = venta;
      this.modal.show();
    }
  }
  
}
