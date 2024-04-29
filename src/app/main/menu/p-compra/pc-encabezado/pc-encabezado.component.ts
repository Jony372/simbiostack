import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { intCliente } from '../../../../services/clientes/clienteInterfaz';
import { intProducto } from '../../../../services/productos/productoInterface';
import { ProductoVenta, intProductoVenta } from '../../../../services/venta/ventaInterface';
import { intProveedor } from '../../../../services/proveedor/interfazProveedor';
import { CompraProducto, intProductoCompra } from '../../../../services/compra/compraInterface';

@Component({
  selector: 'app-pc-encabezado',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pc-encabezado.component.html',
  styleUrl: './pc-encabezado.component.css'
})
export class PcEncabezadoComponent {
  @Input() proveedores!: Array<intProveedor>;
  @Input() productos!: Array<intProducto>;
  @Input() prodCompra!: Array<intProductoCompra>
  @Input() total!: number;
  @Output() sumTotal = new EventEmitter<any>;
  @Output() addProveedor = new EventEmitter<intProveedor>;
  proveedor!: intProveedor | undefined;
  producto!: intProducto | undefined;
  

  addProducto = this.formBuilder.group({
    cantidad: [1, [Validators.required, Validators.min(1)]],
    producto: ['', [Validators.required]],
    precio: [0, [Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), Validators.required]]
  })

  constructor(private formBuilder: FormBuilder){}
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.addProducto.reset({
      cantidad: 1,
      precio: 0
    })
  }
  selectProveedor(evt:any){
    let val = evt.target.value.trim().toLowerCase();
    this.proveedor = this.proveedores.find(proveedor => proveedor.nombre.toLowerCase() == val);
    this.proveedor? this.addProveedor.emit(this.proveedor): null;
  }
  selectProducto(evt: any){
    const val = evt.target.value.trim().toLowerCase();
    const form = this.addProducto;
    this.producto = this.productos.find(prd => prd.nombre.toLowerCase() === val || prd.codigobarra.toLowerCase() === val);
    form.patchValue({precio: this.producto?.precio})
  }

  cant(evt: boolean){
    const cantidad = evt?this.addProducto.value.cantidad as number + 1: this.addProducto.value.cantidad as number - 1; 
    this.addProducto.patchValue({cantidad: cantidad})
  }

  agregarProducto(){
    if (this.addProducto.valid) {
      const prod = this.producto
      const nombre = this.addProducto.value.producto as string;
      const cantidad  = this.addProducto.value.cantidad as number;
      const precio = this.addProducto.value.precio as number;
      const prodVenta = new CompraProducto(undefined, cantidad, prod, undefined, cantidad * precio, precio, nombre)
      this.prodCompra.push(prodVenta as intProductoCompra)
      this.sumTotal.emit(prodVenta.subTotal)
      this.addProducto.reset({
        cantidad: 1
      })
    }else{
      alert("Faltan datos por llenar")
      this.addProducto.markAllAsTouched();
    }
  }
}
