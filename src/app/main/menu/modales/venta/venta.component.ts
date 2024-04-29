import { Component, EventEmitter, Input, Output, input } from '@angular/core';
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
  @Input() total: number = 0;
  @Input() opcion: boolean = true;
  @Input() compra: boolean = false;
  efectivo!: number;
  cambio: number = 0;
  isPagado = false;
  
  ngOnChanges() {
    this.efectivo = this.total;
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
      if(this.compra){
        this.pago.emit(this.isPagado?1:0);
      }else{
        this.pago.emit(this.isPagado?2:1);
      }
    }else{
      Toast.fire({
        icon: 'error',
        title: 'El efectivo no es suficiente'
      })
    }
  }
}
