import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Toast } from '../../../../../assets/const';
import { ModalInterface } from 'flowbite';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css'
})
export class VentaComponent {
  @Output() pago: EventEmitter<number> = new EventEmitter<number>();
  @Input() total!: number;
  @Input() modal!: ModalInterface;
  efectivo!: number;
  cambio: number = 0;
  isPagado = false;
  
  ngOnChanges() {
    this.efectivo = this.total;
  }

  close(){
    this.modal.hide();
  }

  format(n: number): string {
    return n.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  actualizarCambio(){
    this.cambio = this.efectivo - this.total;
  }
  check(evt: any){
    this.isPagado = evt.target.checked;
  }
  pagar(){
    if(this.efectivo >= this.total){
      this.pago.emit(this.isPagado?7:6);
    }else{
      Toast.fire({
        icon: 'error',
        title: 'El efectivo no es suficiente'
      })
    }
  }
}
