import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { intCliente } from '../../../../services/clientes/clienteInterfaz';
import { intUsuario } from '../../../../services/usuarios/usuraioInterface';
import { ClienteService } from '../../../../services/clientes/cliente.service';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';
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
  @Output() enviarUsuarioID = new EventEmitter<number|undefined|null>
  clientes!: Array<intCliente>;
  usuarios!: Array<intUsuario>;
  cliente!: intCliente | undefined;

  constructor(private formBuilder: FormBuilder, private clienteServicio: ClienteService, private usuarioServicio: UsuariosService){}

  cliUser = this.formBuilder.group({
    cliente:["", [Validators.required]],
    tel:['', [Validators.required]],
    usuario: [0, [Validators.required]]
  })

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
    this.cliUser.reset()
  }

  selectCliente(evt:any){
    // alert(this.clientes.find(cliente => cliente.id == evt.target.id.toString().substring(1))?.nombre)
    // alert("dsaf")
    let val = evt.target.value;
    if(val){
      this.cliente = this.clientes.find(cliente => cliente.nombre == val);
      this.cliUser.patchValue({
        cliente:val,
        tel: this.cliente?.tel
      })
      console.log(this.cliente)
      this.enviarCliente.emit(this.cliente);
    }
  }

  onChange(){
    if (this.cliUser.valid) {
      const form = this.cliUser.value;
      this.enviarUsuarioID.emit(form.usuario);
    }
  }
}
