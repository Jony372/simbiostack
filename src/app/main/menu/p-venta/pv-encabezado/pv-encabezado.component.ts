import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toast } from '../../../../../assets/const';
import { intCliente } from '../../../../services/clientes/clienteInterfaz';
import { intProducto } from '../../../../services/productos/productoInterface';
import { ProductoVenta, intProductoVenta } from '../../../../services/venta/ventaInterface';
import { AddClientesComponent } from '../../modales/add-clientes/add-clientes.component';
import { Modal, ModalInterface } from 'flowbite';

@Component({
  selector: 'app-pv-encabezado',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AddClientesComponent],
  templateUrl: './pv-encabezado.component.html',
  styleUrl: './pv-encabezado.component.css'
})
export class PvEncabezadoComponent {
  @Input() clientes!: Array<intCliente>;
  @Input() productos!: Array<intProducto>;
  @Input() prodVenta!: Array<intProductoVenta>
  @Input() total!: number;
  @Output() sumTotal = new EventEmitter<any>;
  @Output() addCliente = new EventEmitter<intCliente>();
  @Output() add = new EventEmitter<null>;
  cliente!: intCliente | undefined;
  producto!: intProducto | undefined;
  modal!: ModalInterface;
  

  addProducto = this.formBuilder.group({
    cliente: [''],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    producto: ['', [Validators.required]],
    precio: [0, [Validators.pattern('^-?[0-9]+(\.[0-9]{1,2})?$'), Validators.required]]
  })

  constructor(private formBuilder: FormBuilder){}
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.addProducto.patchValue({
      cantidad: 1,
    })
    this.modal = new Modal(document.getElementById('add-cliente'));
  }
  selectCliente(evt:any){
    let val = evt.target.value.trim().toLowerCase();
    this.cliente = this.clientes.find(cliente => cliente.nombre.toLowerCase() == val);
    this.addCliente.emit(this.cliente);
  }
  selectProducto(evt: any){
    const val = evt.target.value.trim().toLowerCase();
    const form = this.addProducto;
    this.producto = this.productos.find(prd => prd.nombre.toLowerCase() === val || prd.codigobarra.toLowerCase() === val);
    this.producto?form.patchValue({precio: this.producto?.precio}):undefined;
  }

  nuevoCliente(cl: intCliente){
    this.cliente = cl;
    this.addProducto.patchValue({
      cliente: cl.nombre
    })
    this.add.emit();
    this.addCliente.emit(cl)
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
      const prodVenta = new ProductoVenta(undefined, cantidad, prod as intProducto, undefined, cantidad * precio, precio, nombre)
      // console.log(prodVenta as intProductoVenta)
      this.prodVenta.push(prodVenta as intProductoVenta)
      this.sumTotal.emit(prodVenta.subTotal)
      this.addProducto.patchValue({
        cantidad: 1,
        producto: null,
        precio: null
      })
      this.addProducto.markAsUntouched()
    }else{
      Toast.fire({
        title: "Agregue los datos necesarios del producto",
        icon: 'warning'
      });
      this.addProducto.markAllAsTouched();
    }
  }
}
