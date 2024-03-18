import { Component } from '@angular/core';
import { intUsuario } from '../../../services/usuarios/usuraioInterface';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { AddUsuarioComponent } from '../modales/add-usuario/add-usuario.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [AddUsuarioComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios!:  Array<intUsuario>;
  add: boolean = true;
  usuario!: intUsuario | undefined;

  constructor(private usuarioServicio: UsuariosService){}

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.usuarioServicio.mostrar().subscribe({
      next: data=> this.usuarios = data,
      error: err => console.log('Error al obtener los datos: '+err)
    })
  }

  editar(usuario:intUsuario){
    this.add = false;
    this.usuario = usuario;
  }

  eliminar(id:number){
    this.usuarioServicio.eliminar(id).subscribe({
      error: err => console.log("Error al eliminar el usuario: "+err),
      complete: () => {
        this.usuarios = this.usuarios.filter(user => user.id != id)
        alert("Se elimino el usuario");
      }
    })
  }

  agregar(){
    this.add = true;
    this.usuario = undefined;
  }

}
