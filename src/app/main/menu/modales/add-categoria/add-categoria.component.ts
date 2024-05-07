import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { mostrarCategoria } from '../../../../services/categorias/mostrarCategoria.service';  
import { HttpClientModule } from '@angular/common/http';
import { intCategoria } from '../../../../services/categorias/categoriaInterfaz';
import { intProducto, intRegProducto } from '../../../../services/productos/productoInterface';
import { ProductosService } from '../../../../services/productos/productos.service';

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

  categorias: Array<intCategoria> = [];

  constructor(private categoriaServicio:mostrarCategoria ,private formbuilder: FormBuilder){
    // this.producto = new Object as intProducto
    // this.getProd.obtenerProducto(this.id).subscribe({
    //   next: prod => this.producto = prod,
    //   error: err=> console.error("Error al obtener los datos: "+err)
    // })
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
        error: err => alert("Error al insertar el producto: "+err),
        complete: () => window.location.reload()
      });
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
        error: error => alert("Error al editar el producto: "+error),
        complete: ()=>window.location.reload()
      })
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
