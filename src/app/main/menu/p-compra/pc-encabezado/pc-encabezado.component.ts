import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { intCliente } from '../../../../services/clientes/clienteInterfaz';
import { intProducto } from '../../../../services/productos/productoInterface';
import { ProductoVenta, intProductoVenta } from '../../../../services/venta/ventaInterface';
import { intProveedor } from '../../../../services/proveedor/interfazProveedor';
import { CompraProducto, intProductoCompra } from '../../../../services/compra/compraInterface';
import { Modal, ModalInterface } from 'flowbite';
import { AddProveedoresComponent } from '../../modales/add-proveedores/add-proveedores.component';

@Component({
  selector: 'app-pc-encabezado',
  standalone: true,
  imports: [ReactiveFormsModule, AddProveedoresComponent],
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
  @Output() actualizar = new EventEmitter<null>;
  proveedor!: intProveedor | undefined;
  producto!: intProducto | undefined;
  modal!: ModalInterface;
  

  addProducto = this.formBuilder.group({
    proveedor: [''],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    producto: ['', [Validators.required]],
    precio: [0, [Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), Validators.required]]
  })

  constructor(private formBuilder: FormBuilder){}
  
  ngOnInit(): void {
    this.addProducto.patchValue({
      cantidad: 1,
      precio: null,
      producto: null
    })

    this.modal = new Modal(document.getElementById('add-proveedor'));
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

  nuevoProveedor(prov: intProveedor){
    this.proveedor = prov;
    this.addProveedor.emit(prov);
    this.actualizar.emit()
    this.addProducto.patchValue({
      proveedor: prov.nombre
    })
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
