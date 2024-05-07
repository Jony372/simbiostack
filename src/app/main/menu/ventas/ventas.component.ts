import { Component } from '@angular/core';
import { intPendiente } from '../../../services/pendientes/pendientesInterface';
import { PendientesService } from '../../../services/pendientes/pendientes.service';
import { intVenta } from '../../../services/venta/ventaInterface';
import { VentaService } from '../../../services/venta/venta.service';
import { Router } from '@angular/router';
import { format } from '../../../../assets/const';
import { intCliente } from '../../../services/clientes/clienteInterfaz';
import { ClienteService } from '../../../services/clientes/cliente.service';
import { ConfirmarComponent } from '../modales/confirmar/confirmar.component';
import { Toast } from '../../../../assets/const';

@Component({
  selector: 'app-pendientes',
  standalone: true,
  imports: [ConfirmarComponent],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {
  ventas: Array<intVenta> = []
  clientes!: Array<intCliente>
  filtroVentas!: Array<intVenta>;
  cliente!: intCliente;
  canVenta!: number;
  texto!: string;
  fechaInicio!: string;
  fechaFin!: string;
  format = format

  constructor(private ventaServicio: VentaService, private clienteServicio: ClienteService){}

  ngOnInit(){
    this.actualizarDatos();
  }

  actualizarDatos(){
    this.ventaServicio.mostrarVentas().subscribe({
      next: (data) => {
        this.ventas = data.sort((a, b) => b.id - a.id);
        this.filtroVentas = this.ventas;
      },
      error: (error) => console.error("Error al mostrar los pendientes: "+error)
    })

    this.clienteServicio.mostrar().subscribe({
      next: data => {
        this.clientes = data;
      },
      error: error => console.error("Error al mostrar los clientes: "+error)
    })

  }

  selectCliente(evt: any){
    const val = evt.target.value;
    this.cliente = this.clientes.find(c => c.nombre === val)!;
    if (this.cliente) {
      this.filtroVentas = this.ventas.filter(v => v.cliente.id === this.cliente.id);
    }
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

  abrir(id: number){
    window.open(`nota-venta?folio=${id}`)
  }

  fecha(fecha: any, inicio: boolean){
    if (inicio) {
      this.fechaInicio = fecha.target.value
      this.filtroVentas = this.ventas.filter(v => v.fecha.split(" ")[0] >= this.fechaInicio);
      console.log('si')
    }else{
      this.fechaFin = fecha.target.value
      this.filtroVentas = this.ventas.filter(v => v.fecha.split(" ")[0] <= this.fechaFin);
      console.log('si')
    }
    if (this.fechaInicio && this.fechaFin) {
      this.filtroVentas = this.ventas.filter(v => v.fecha.split(" ")[0] >= this.fechaInicio && v.fecha.split(" ")[0] <= this.fechaFin);
      console.log('si')
    }
  }
  
}
