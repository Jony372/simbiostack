import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { intCliente } from '../../../../services/clientes/clienteInterfaz';
import { intProducto } from '../../../../services/productos/productoInterface';
import { ProductoVenta, intProductoVenta } from '../../../../services/venta/ventaInterface';
import { intNotaEquipo } from '../../../../services/notas/interfazNota';
import { controllers } from 'chart.js';

@Component({
  selector: 'app-pve-encabezado',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pve-encabezado.component.html',
  styleUrl: './pve-encabezado.component.css'
})
export class PveEncabezadoComponent {
  @Input() clientes!: Array<intCliente>;
  @Input() notas!: Array<intNotaEquipo>;
  @Input() productos!: Array<intProducto>;
  @Input() prodVenta!: Array<intProductoVenta>
  @Input() total!: number;
  @Output() sumTotal = new EventEmitter<any>;
  @Output() addCliente = new EventEmitter<intCliente>();
  @Output() addNota = new EventEmitter<intNotaEquipo>();
  nota!: intNotaEquipo | undefined;
  cliente!: intCliente | undefined;
  producto!: intProducto | undefined;
  

  addProducto = this.formBuilder.group({
    cliente: [''],
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
  // selectCliente(evt:any){
  //   let val = evt.target.value.trim().toLowerCase();
  //   this.cliente = this.clientes.find(cliente => cliente.nombre.toLowerCase() == val);
  //   this.cliente? this.addCliente.emit(this.cliente): null;
  // }

  selectNota(evt: any){
    const val = evt.target.value.trim()
    this.nota = this.notas.find(nota => nota.id == val);
    if(this.nota){
      this.addNota.emit(this.nota);
      this.cliente = this.nota.cliente;
      this.addCliente.emit(this.cliente);
      this.addProducto.patchValue({cliente: this.cliente.nombre})
    }
    
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
      const prodVenta = new ProductoVenta(undefined, cantidad, prod as intProducto, undefined, cantidad * precio, precio, nombre)
      // console.log(prodVenta as intProductoVenta)
      this.prodVenta.push(prodVenta as intProductoVenta)
      this.sumTotal.emit(prodVenta.subTotal)
      this.addProducto.reset({
        cliente: this.cliente?.nombre,
        cantidad: 1
      })
    }else{
      alert("Faltan datos por llenar")
      this.addProducto.markAllAsTouched();
    }
  }
}