import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toast } from '../../../../../assets/const';
import { ClienteService } from '../../../../services/clientes/cliente.service';
import { intCliente } from '../../../../services/clientes/clienteInterfaz';
import { EstadoService } from '../../../../services/estado/estado.service';
import { intEstado } from '../../../../services/estado/interfazEstado';
import { PendientesService } from '../../../../services/pendientes/pendientes.service';
import { intPendiente } from '../../../../services/pendientes/pendientesInterface';
import { intPrioridad } from '../../../../services/prioridad/interfazPrioridad';
import { PrioridadService } from '../../../../services/prioridad/prioridad.service';
import { intTipo } from '../../../../services/tipo/interfazTipo';
import { TipoService } from '../../../../services/tipo/tipo.service';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';
import { intUsuario } from '../../../../services/usuarios/usuraioInterface';
import { ModalInterface } from 'flowbite';

@Component({
  selector: 'app-add-pendiente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-pendiente.component.html',
  styleUrl: './add-pendiente.component.css'
})
export class AddPendienteComponent {
  @Input() add!: boolean;
  @Input() pendiente!: intPendiente|undefined;
  @Input() modal!: ModalInterface;
  @Output() listo = new EventEmitter<null>
  private cliente!: intCliente | undefined
  clientes!: Array<intCliente>
  usuarios!: Array<intUsuario>
  prioridades!: Array<intPrioridad>
  estados!: Array<intEstado>
  tipos!: Array<intTipo>
  
  constructor(private pendienteServicio:PendientesService, private formBuilder:FormBuilder, private clienteServicio: ClienteService, private usuarioServicio: UsuariosService, private prioridadServicio: PrioridadService, private estadoServicio: EstadoService, private tipoServicio: TipoService) {}

  ngOnInit(){
    this.clienteServicio.mostrar().subscribe({
      next: data => this.clientes = data,
      error: err => console.error("Error al cargar los clientes: " + err)
    })
    this.usuarioServicio.mostrar().subscribe({
      next: data => this.usuarios = data,
      error: err => console.error("Error al mostrar los usuarios: " + err)
    })
    this.prioridadServicio.mostrar().subscribe({
      next: data => this.prioridades = data,
      error: err => console.error("Error al mostrar las prioridades: " + err)
    })
    this.estadoServicio.mostrarEstados().subscribe({
      next: data => this.estados = data,
      error: err => console.error("Error al mostrar los tipos de estados: " + err)
    })
    this.tipoServicio.mostrar().subscribe({
      next: data => this.tipos = data,
      error: err => console.error("Error al mostrar los tipos: " + err)
    })
  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.pendiente ) {
      const p = this.pendiente;
      this.addPendiente.patchValue({
        id: p.id,
        nombre: p.nombre,
        cliente: p.cliente?.id,
        usuario: p.usuario.id,
        prioridad: p.prioridad.id,
        descripcion: p.descripcion,
        fechaEstimada: p.fechaEstimada,
        estado: p.estado.id
      })
    }else{
      this.addPendiente.reset({
        prioridad: 2,
        estado: 6,
        tipo: 1,
        usuario: 1
      });
    }
  }

  addPendiente = this.formBuilder.group({
    id:[0],
    nombre: ['', [Validators.required]],
    cliente: [0],
    usuario: [0, [Validators.required]],
    prioridad: [0, [Validators.required]],
    descripcion: ['', [Validators.required]],
    fechaEstimada: [''],
    estado: [0, [Validators.required]],
    tipo: [0, [Validators.required]]
  })

  agregar(){
    if(this.addPendiente.valid && this.add){
      console.log(this.addPendiente.value)
      const p = this.addPendiente.value
      this.pendienteServicio.agregarPendiente(
        p.nombre as string,
        this.cliente?.id,
        p.usuario as number,
        p.prioridad as number,
        p.descripcion as string,
        p.fechaEstimada,
        p.estado as number,
        p.tipo as number
      ).subscribe({
        error: err=>console.error("Ocurrió un error al editar el pendiente: "+err),
        complete:()=> {
          Toast.fire({
            icon: 'success',
            title: 'Se agrego el pendiente'
          })
          this.modal.hide();
          this.listo.emit();
        }
      })
    }else{
      // console.log(this.addPendiente.get('telefono')?.errors)
      Toast.fire({
        icon: 'warning',
        title: "Faltan campos por llenar"
      })
      this.addPendiente.markAllAsTouched();
    }
  }

  editar(){
    if(this.addPendiente.valid && !this.add){
      const p = this.addPendiente.value;
      this.pendienteServicio.editarPendiente(
        p.id as number,
        p.nombre as string,
        this.cliente?.id,
        p.usuario as number,
        p.prioridad as number,
        p.descripcion as string,
        p.fechaEstimada,
        p.estado as number,
        p.tipo as number
      ).subscribe({
        error: err=>console.error("Ocurrió un error al editar el pendiente: "+err),
        complete:()=> {
          Toast.fire({
          icon: 'success',
          title: 'Se edito el pendiente'
        })
        this.modal.hide();
        this.listo.emit();
      }
      })
    }else{
      Toast.fire({
        icon: 'warning',
        title: 'Revise los campos necesarios'
      })
      this.addPendiente.markAllAsTouched();
    }
  }

  selectCliente(evt: any){
    const name = evt.target.value;
    this.cliente = this.clientes.find(c => c.nombre.toLowerCase() === name.toLowerCase())
    console.log(this.cliente)
  }
}
