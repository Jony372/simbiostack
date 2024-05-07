import { Component, inject } from '@angular/core';
import { Modal, ModalInterface } from 'flowbite';
import { CookieService } from 'ngx-cookie-service';
import { Toast, format } from '../../../../assets/const';
import { ClienteService } from '../../../services/clientes/cliente.service';
import { intCliente } from '../../../services/clientes/clienteInterfaz';
import { EntregaService } from '../../../services/entrega/entrega.service';
import { intEntregaServicio } from '../../../services/entrega/notaEntregaInterface';
import { intGetNotaEquipos } from '../../../services/notas/interfazNota';
import { NotasService } from '../../../services/notas/notas.service';
import { ProductosService } from '../../../services/productos/productos.service';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { DiagnosticosComponent } from '../modales/diagnosticos/diagnosticos.component';
import { VentaComponent } from '../modales/venta/venta.component';
import { PveEncabezadoComponent } from './pve-encabezado/pve-encabezado.component';
import { PveTablaComponent } from './pve-tabla/pve-tabla.component';

@Component({
  selector: 'app-pv-entrega',
  standalone: true,
  imports: [PveTablaComponent, PveEncabezadoComponent, VentaComponent, DiagnosticosComponent],
  templateUrl: './pv-entrega.component.html',
  styleUrl: './pv-entrega.component.css'
})
export class PvEntregaComponent {
  cookieService = inject(CookieService);

  clientes!: Array<intCliente>;
  prodServ!: Array<any>;
  notas!: Array<intGetNotaEquipos>;
  prodServEntrega: Array<intEntregaServicio> = [];
  cliente!: intCliente;
  total: number = 0;
  modal!: ModalInterface;
  diagnosticosModal!: ModalInterface;
  nota!: intGetNotaEquipos;

  format = format;

  constructor(private notaServicio: NotasService , private servicioServicio: ServiciosService, private entregaServicio: EntregaService, private clienteServicio: ClienteService, private productoServicio: ProductosService){}

  ngOnInit(){

    const modalHtml = document.getElementById('venta-modal');
    this.modal = new Modal(modalHtml);

    const mdHtml = document.getElementById('add-diagnosticos')
    this.diagnosticosModal = new Modal(mdHtml)
    
    this.clienteServicio.mostrar().subscribe({
      next: data => this.clientes = data,
      error: err => console.error("Error al cargar los clientes: "+err)
    })
    this.servicioServicio.prodServs().subscribe({
      next: data => this.prodServ = data,
      error: err => console.error("Error al mostrar los productos: "+err)
    })
    this.notaServicio.obtenerNotas().subscribe({
      next: data => this.notas = data,
      error: err => console.error("Error al mostrar las notas: "+err)
    })
  }

  addCliente(cliente: intCliente){
    this.cliente = cliente;
  }


  addNota(nota: intGetNotaEquipos){
    this.nota = nota;
  }

  sumTotal(cant: number){
    this.total += cant;
  }

  actionModal(){
    if (this.cliente && this.prodServEntrega.length > 0) {
      // this.diagnosticosModal.show()
      this.modal.show()
    }else{
      Toast.fire({
        icon: 'error',
        title: 'Faltan datos por llenar'
      })
      console.log(this.cliente)
    }
  }

  pago(evt: number[]){
    const estado = evt[0];
    const usuario = JSON.parse(this.cookieService.get('user')).id;
    this.entregaServicio.crearNotaEntrega(usuario, this.cliente.id, this.total, estado, true, this.nota.id).subscribe({
      next: data => {
        this.prodServEntrega.forEach((prod, i) => {
          // console.log(prod)
          this.entregaServicio.agregarEntregaServicio(prod.servicio?2:1.,data.id, prod.servicio?prod.servicio as number: undefined, prod.cantidad, prod.producto?prod.producto as number:undefined, prod.nombre, prod.subTotal, prod.precio).subscribe({
            error: err => console.error("Error al agregar el producto: "+err),
            complete: () => {
              if (i == this.prodServEntrega.length - 1){
                window.open(`http://localhost:4200/nota-entrega?folio=${data.id}`)
                window.location.reload();
              }
              console.log("Venta realizada")
            }
          })
        });
      },
      error: err => console.error("Error al agregar la venta: "+err),
    })
  }

}
