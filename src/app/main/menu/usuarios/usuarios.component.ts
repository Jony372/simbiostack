import { Component } from '@angular/core';
import { intUsuario } from '../../../services/usuarios/usuraioInterface';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { AddUsuarioComponent } from '../modales/add-usuario/add-usuario.component';
import { Modal, ModalInterface } from 'flowbite';
import { ConfirmarComponent } from '../modales/confirmar/confirmar.component';
import { Toast } from '../../../../assets/const';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [AddUsuarioComponent, ConfirmarComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios!:  Array<intUsuario>;
  add: boolean = true;
  usuario!: intUsuario | undefined;
  modal!: ModalInterface;
  modalConfirmar!: ModalInterface;
  eUsuario!: intUsuario;

  constructor(private usuarioServicio: UsuariosService){}

  ngOnInit(){
    this.actualizar();
  }

  actualizar() {
    this.modal = new Modal(document.getElementById('add-usuario'))
    this.modalConfirmar = new Modal(document.getElementById('confirmar-modal'))

    this.usuarioServicio.mostrar().subscribe({
      next: data=> this.usuarios = data,
      error: err => console.log('Error al obtener los datos: '+err)
    })
  }

  editar(usuario:intUsuario){
    this.add = false;
    this.usuario = usuario;
    this.modal.show()
  }

  eliminar(){
    this.usuarioServicio.eliminar(this.eUsuario.id).subscribe({
      next: data => {
        Toast.fire({
          icon: data.status === 200? 'success':'warning',
          title: data.mensaje
        })
      },
      error: err => {
        Toast.fire({
          icon: 'error',
          title: 'Error al eliminar el usuario: ' + err
        })
      },
      complete: () => {
        this.actualizar();
      }
    })
  }

  agregar(){
    this.add = true;
    this.usuario = undefined;
    this.modal.show()
  }

  selectUsuario(usuario: intUsuario){
    this.eUsuario = usuario;
    this.modalConfirmar.show();
  }

}
