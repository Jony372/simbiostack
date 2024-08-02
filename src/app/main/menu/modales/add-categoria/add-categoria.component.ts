import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { mostrarCategoria } from '../../../../services/categorias/mostrarCategoria.service';  
import { HttpClientModule } from '@angular/common/http';
import { intCategoria } from '../../../../services/categorias/categoriaInterfaz';
import { intProducto, intRegProducto } from '../../../../services/productos/productoInterface';
import { ProductosService } from '../../../../services/productos/productos.service';
import { ModalInterface } from 'flowbite';
import { Toast } from '../../../../../assets/const';

@Component({
  selector: 'app-add-categoria',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-categoria.component.html',
  styleUrl: './add-categoria.component.css'
})
export class AddCategoriaComponent {
  @Input() add!: boolean;
  @Input() categoria!: intCategoria|undefined;
  @Input() modal!: ModalInterface;
  @Output() listo = new EventEmitter<null>;

  categorias: Array<intCategoria> = [];

  constructor(private categoriaServicio:mostrarCategoria ,private formbuilder: FormBuilder){
  }

  
  

  ngOnChanges(): void {

    if (this.categoria) {
      this.addCategoria.patchValue({
        ...this.categoria
      })
    }else{
      this.addCategoria.reset();
    }
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
  }
  
  addCategoria = this.formbuilder.group({
    id:[0],
    nombre:["", [Validators.required]],
    stock:[0, [Validators.required]],
  });

  agregar() {
    if (this.addCategoria.valid && this.add) {
      // console.log(this.addProducto.value);
      const cat=this.addCategoria.value;
      this.categoriaServicio.agregarCategoria(
        cat.nombre as string,
        cat.stock as number
        ).subscribe({
        next: data => {
          Toast.fire({
            icon: 'success',
            title: 'Se agrego la categoria '+data.nombre
          })
        },
        error: err => {
          Toast.fire({
            icon: 'error',
            title: 'Hubo un error al agregar la categoria: '+err
          })
        },
        complete: () => {
          this.listo.emit();
          this.modal.hide()
        }
      });
    }else{
      Toast.fire({
        icon: 'warning',
        title: 'Revise los datos e inténtelo de nuevo, por favor'
      });
      this.addCategoria.markAllAsTouched();
    }
  }
  editar(){
    if(this.addCategoria.valid && !this.add){
      const cat=this.addCategoria.value;
      this.categoriaServicio.editarCategoria(
          cat.id as number,
          cat.nombre as string,
          cat.stock as number
        ).subscribe({
        next: data => {
          Toast.fire({
            icon: 'success',
            title: 'Se edito la categoria '+data.nombre
          })
        },
        error: err => {
          Toast.fire({
            icon: 'error',
            title: 'Hubo un error al editar la categoria: '+err
          })
        },
        complete: () => {
          this.listo.emit();
          this.modal.hide()
        }
      });
    }else{
      Toast.fire({
        icon: 'warning',
        title: 'Revise los datos e inténtelo de nuevo, por favor'
      });
      this.addCategoria.markAllAsTouched();
    }
  }

  accion(){
    if (this.add) {
      this.agregar()
    }else{
      this.editar()
    }
  }

}
