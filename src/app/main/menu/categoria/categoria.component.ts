import { Component } from '@angular/core';
import { intUsuario } from '../../../services/usuarios/usuraioInterface';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { AddUsuarioComponent } from '../modales/add-usuario/add-usuario.component';
import { intCategoria } from '../../../services/categorias/categoriaInterfaz';
import { mostrarCategoria } from '../../../services/categorias/mostrarCategoria.service';
import { AddCategoriaComponent } from '../modales/add-categoria/add-categoria.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [AddCategoriaComponent],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {
  categorias!:  Array<intCategoria>;
  add: boolean = true;
  categoria!: intCategoria | undefined;

  constructor(private categoriaServicio: mostrarCategoria){}

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.categoriaServicio.categorias().subscribe({
      next: data=> this.categorias = data,
      error: err => console.log('Error al obtener los datos: '+err)
    })
  }

  editar(categoria:intCategoria){
    this.add = false;
    this.categoria = categoria;
  }

  eliminar(id:number){
    this.categoriaServicio.eliminarCategoria(id).subscribe({
      error: err => console.log("Error al eliminar el usuario: "+err),
      complete: () => {
        this.categorias = this.categorias.filter(user => user.id != id)
        alert("Se elimino el usuario");
      }
    })
  }

  agregar(){
    this.add = true;
    this.categoria = undefined;
  }

}
