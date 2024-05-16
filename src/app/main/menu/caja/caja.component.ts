import { Component } from '@angular/core';
import { CajaService } from '../../../services/caja/caja.service';
import { intCaja } from '../../../services/caja/cajaInterfaz';
import { Toast } from '../../../../assets/const';
import { format } from '../../../../assets/const';
import { Modal, ModalInterface } from 'flowbite';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './caja.component.html',
  styleUrl: './caja.component.css'
})
export class CajaComponent {
  cajaActual!: intCaja;
  modal!: ModalInterface;
  dinero: number = 0;
  format = format;

  constructor(private cajaServicio: CajaService) { }

  ngOnInit(){
    this.actualizar();
  }

  actualizar(){
    this.modal = new Modal(document.getElementById('din-inicial')!);

    this.cajaServicio.cajaActual().subscribe({
      next: data => this.cajaActual = data,
      error: err => {
        Toast.fire({
          icon: 'error',
          title: 'Error al cargar la caja ' + err
        });
        console.log('Error al cargar la caja');
        console.error(err);
      }
    });
  }

  total(c: intCaja): number{
    if (c) {
      return c.dinInicial + c.entradas - c.salidas;
    }else{
      return 0;
    }
  }

  cerrarCaja(){
    if(this.dinero >= 0){
      this.cajaServicio.abrirCaja(this.dinero).subscribe({
        error: err => {
          Toast.fire({
            icon: 'error',
            title: 'Error al cerrar la caja ' + err
          });
          console.log('Error al cerrar la caja');
          console.error(err);
        },
        complete: () => {
          this.actualizar();
          this.modal.hide();
        }
      })
    }else{
      Toast.fire({
        icon: 'error',
        title: 'El dinero no puede ser negativo'
      });
    }
  }
}
