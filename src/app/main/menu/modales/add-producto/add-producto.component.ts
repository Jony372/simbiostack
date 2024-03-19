import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { mostrarCategoria } from '../../../../services/categorias/mostrarCategoria.service';  
import { HttpClientModule } from '@angular/common/http';
import { intCategoria } from '../../../../services/categorias/categoriaInterfaz';
import { intProducto, intRegProducto } from '../../../../services/productos/productoInterface';
import { ProductosService } from '../../../../services/productos/productos.service';

@Component({
  selector: 'app-add-producto',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-producto.component.html',
  styleUrl: './add-producto.component.css'
})
export class AddProductoComponent {
  @Input() add!: boolean;
  @Input() prod!: intProducto|undefined;

  categorias: Array<intCategoria> = [];

  constructor(private productoServicio:ProductosService ,private formbuilder: FormBuilder, private showCat:mostrarCategoria){
    // this.producto = new Object as intProducto
    // this.getProd.obtenerProducto(this.id).subscribe({
    //   next: prod => this.producto = prod,
    //   error: err=> console.error("Error al obtener los datos: "+err)
    // })
  }

  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.showCat.categorias().subscribe({
      next: (data)=>{
        this.categorias = data.sort((a,b)=>a.nombre.localeCompare(b.nombre));
      }
    })

  }

  ngOnChanges(): void {

    if (this.prod) {
      this.addProducto.patchValue({
        ...this.prod,
        categoria: this.prod.categoria.id
      })
    }else{
      this.addProducto.reset();
    }
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
  }
  
  addProducto = this.formbuilder.group({
    id:[0],
    codigobarra:["", [Validators.required]],
    nombre:["", [Validators.required]],
    precio:[0, [Validators.required]],
    categoria:[1, [Validators.required]],
    utilidad:[0, [Validators.required]],
    cantidad:[0,[Validators.required]],
    costo:[0,Validators.required]
  });

  agregar() {
    if (this.addProducto.valid && this.add) {
      // console.log(this.addProducto.value);
      const productos=this.addProducto.value;
      this.productoServicio.agregarProducto(
        productos.precio as number,
        productos.cantidad as number,
        productos.codigobarra as string,
        productos.nombre as string,
        productos.categoria as number,
        productos.costo as number,
        productos.utilidad as number
        ).subscribe({
        error: err => alert("Error al insertar el producto: "+err),
        complete: () => window.location.reload()
      });
    }
  }
  editar(producto:intRegProducto){
    if(this.addProducto.valid && !this.add){
      const productos=this.addProducto.value;
      this.productoServicio.editarProducto(
        productos.id as number,
        productos.precio as number,
        productos.cantidad as number,
        productos.codigobarra as string,
        productos.nombre as string,
        productos.categoria as number,
        productos.costo as number,
        productos.utilidad as number
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
      this.editar(this.addProducto.value as intRegProducto)
    }
  }

}
