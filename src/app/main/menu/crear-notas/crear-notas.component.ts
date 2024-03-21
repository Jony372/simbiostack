import { Component } from '@angular/core';
import { intCliente } from '../../../services/clientes/clienteInterfaz';
import { ClienteService } from '../../../services/clientes/cliente.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { intUsuario } from '../../../services/usuarios/usuraioInterface';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { UsuarioClienteComponent } from './usuario-cliente/usuario-cliente.component';
import { AgregarEquipoComponent } from './agregar-equipo/agregar-equipo.component';
import { TablaEquiposComponent } from './tabla-equipos/tabla-equipos.component';

@Component({
  selector: 'app-crear-notas',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, UsuarioClienteComponent, AgregarEquipoComponent, TablaEquiposComponent],
  templateUrl: './crear-notas.component.html',
  styleUrl: './crear-notas.component.css'
})
export class CrearNotasComponent {
  cliente!: intCliente;

  constructor(private clienteServicio:ClienteService, private usuarioServicio: UsuariosService, private formBuilder: FormBuilder){}

  

  nota =  this.formBuilder.group({
    cliente:[""],
    tel:[''],
    usuario: [1, [Validators.required]]
  })

  elegirCliente(cliente: intCliente){
    this.cliente=cliente;
  }
  

}
