import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../../../services/clientes/cliente.service';
import { intCliente } from '../../../../services/clientes/clienteInterfaz';
import { intPrioridad } from '../../../../services/prioridad/interfazPrioridad';
import { PrioridadService } from '../../../../services/prioridad/prioridad.service';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';
import { intUsuario } from '../../../../services/usuarios/usuraioInterface';
import { AddClientesComponent } from '../../modales/add-clientes/add-clientes.component';

@Component({
  selector: 'app-usuario-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, AddClientesComponent],
  templateUrl: './usuario-cliente.component.html',
  styleUrl: './usuario-cliente.component.css'
})
export class UsuarioClienteComponent {
  
  @Output() enviarCliente = new EventEmitter<intCliente>
  clientes!: Array<intCliente>;
  usuarios!: Array<intUsuario>;
  cliente!: intCliente | undefined;
  @Input() cliUser!: FormGroup;
  prioridades!: Array<intPrioridad>;

  constructor(private prioridadServicio: PrioridadService, private clienteServicio: ClienteService, private usuarioServicio: UsuariosService){}

  // cliUser = this.formBuilder.group({
  //   cliente:["", [Validators.required]],
  //   tel:['', [Validators.required]],
  //   usuario: [0, [Validators.required]]
  // })

  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.clienteServicio.mostrar().subscribe({
      next: data => this.clientes = data,
      error: err => console.error("Error al mostrar los clientes: "+err)
    })
    this.usuarioServicio.mostrar().subscribe({
      next: data => this.usuarios = data,
      error: err => console.error("No se pudo mostrar los usuarios: "+err)
    })
    this.prioridadServicio.mostrar().subscribe({
      next: data => this.prioridades = data,
      error: err => console.error("Error al mostrar las prioridades: "+err)
    })
  }

  selectCliente(evt:any){
    // alert(this.clientes.find(cliente => cliente.id == evt.target.id.toString().substring(1))?.nombre)
    // alert("dsaf")
    let val = evt.target.value;
    console.log(val)
    this.cliente = this.clientes.find(cliente => cliente.nombre == val);
    // if(this.cliente){
      this.cliUser.patchValue({
        cliente:val,
        tel: this.cliente?.tel
      })
      console.log(this.cliente)
      this.enviarCliente.emit(this.cliente);
    // }
  }

}
