import { Component } from '@angular/core';
import { intUsuario } from '../../../services/usuarios/usuraioInterface';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { AddUsuarioComponent } from '../modales/add-usuario/add-usuario.component';
import { intCategoria } from '../../../services/categorias/categoriaInterfaz';
import { mostrarCategoria } from '../../../services/categorias/mostrarCategoria.service';
import { AddCategoriaComponent } from '../modales/add-categoria/add-categoria.component';
import { ConfirmarComponent } from '../modales/confirmar/confirmar.component';
import { Modal, ModalInterface } from 'flowbite';
import { Toast } from '../../../../assets/const';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [AddCategoriaComponent, ConfirmarComponent],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {
  categorias!:  Array<intCategoria>;
  add: boolean = true;
  categoria!: intCategoria | undefined;
  eCategoria!: intCategoria;
  modal!: ModalInterface;
  modalConfirmar!: ModalInterface;

  constructor(private categoriaServicio: mostrarCategoria){}

  ngOnInit(){
    this.actualizar()
  }

  actualizar() {
    this.modal = new Modal(document.getElementById('add-categoria'))
    this.modalConfirmar = new Modal(document.getElementById('confirmar-modal'))
    
    this.categoriaServicio.categorias().subscribe({
      next: data=> this.categorias = data,
      error: err => console.log('Error al obtener los datos: '+err)
    })
  }

  editar(categoria:intCategoria){
    this.add = false;
    this.categoria = categoria;
    this.modal.show();
  }

  eliminar(){
    this.categoriaServicio.eliminarCategoria(this.eCategoria.id).subscribe({
      next: data => {
        Toast.fire({
          icon: data.status === 200? 'success':'warning',
          title: data.mensaje
        })
      },
      error: err => {
        Toast.fire({
          icon: 'error',
          title: 'Error al eliminar la categoria: ' + err
        })
      },
      complete: () => {
        this.actualizar();
      }
    })
  }

  agregar(){
    this.add = true;
    this.categoria = undefined;
    this.modal.show()
  }

  selectCategoria(c: intCategoria){
    this.eCategoria = c;
    this.modalConfirmar.show();
  }

}
