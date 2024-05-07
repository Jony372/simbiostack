import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalInterface } from 'flowbite';
import { Toast } from '../../../../../assets/const';
import { intCliente } from '../../../../services/clientes/clienteInterfaz';
import { entregaServicio, intEntregaServicio } from '../../../../services/entrega/notaEntregaInterface';
import { intGetNotaEquipos } from '../../../../services/notas/interfazNota';
import { NotasService } from '../../../../services/notas/notas.service';
import { intProducto } from '../../../../services/productos/productoInterface';
import { intServicios } from '../../../../services/servicios/interfazServicios';
import { ProductoVenta, intProductoVenta } from '../../../../services/venta/ventaInterface';

@Component({
  selector: 'app-pve-encabezado',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pve-encabezado.component.html',
  styleUrl: './pve-encabezado.component.css'
})
export class PveEncabezadoComponent {
  @Input() clientes!: Array<intCliente>;
  @Input() notas!: Array<intGetNotaEquipos>;
  @Input() prodServ!: Array<any>;
  @Input() prodServEntrega!: Array<intEntregaServicio>
  @Input() total!: number;
  @Input() diagModal!: ModalInterface;
  @Output() sumTotal = new EventEmitter<any>;
  @Output() addCliente = new EventEmitter<intCliente>();
  @Output() addNota = new EventEmitter<intGetNotaEquipos>();
  pendientes!: Array<number>;
  nota!: intGetNotaEquipos | undefined;
  cliente!: intCliente | undefined;
  servicio!: Array<any>;
  

  addProducto = this.formBuilder.group({
    cliente: [''],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    producto: ['', [Validators.required]],
    precio: [0, [Validators.pattern('^-?[0-9]+(\.[0-9]{1,2})?$'), Validators.required]]
  })

  constructor(private formBuilder: FormBuilder, private notaServicio: NotasService){}

  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.addProducto.reset({
      cantidad: 1
      
    })
    this.notaServicio.notasTrabajando().subscribe({
      next: data => this.pendientes = data,
      error: err => console.error("Error al mostrar las notas: "+err)
    })
    this.addProducto.get('cliente')?.disable()
  }
  // selectCliente(evt:any){
  //   let val = evt.target.value.trim().toLowerCase();
  //   this.cliente = this.clientes.find(cliente => cliente.nombre.toLowerCase() == val);
  //   this.cliente? this.addCliente.emit(this.cliente): null;
  // }

  selectNota(evt: any){
    const val = evt.target.value.trim()
    this.nota = this.notas.find(nota => nota.id == val);
    // if(this.nota){
      this.addNota.emit(this.nota);
      this.cliente = this.nota?.cliente;
      this.addCliente.emit(this.cliente);
      this.addProducto.patchValue({cliente: this.cliente?.nombre})
    // }
    
  }

  selectProducto(evt: any){
    try{
      const val = evt.target.value.trim().toLowerCase();
      const form = this.addProducto;
      this.servicio = this.prodServ.find(prd => prd[2].toLowerCase() === val);
      this.servicio?form.patchValue({precio:this.servicio[3]}):undefined;

    }catch(err){
      console.error(err)
    }
  }

  cant(evt: boolean){
    const cantidad = this.addProducto.value.cantidad as number + (evt?1:-1); 
    this.addProducto.patchValue({cantidad: cantidad})
  }

  agregarProducto(){
    if (this.addProducto.valid) {
      const serv = this.servicio || [1, 1]
      const nombre = this.addProducto.value.producto as string;
      const cantidad  = this.addProducto.value.cantidad as number;
      const precio = this.addProducto.value.precio as number;
      console.log(serv[0])
      const prodVenta = new entregaServicio(undefined, undefined, serv[0]==2?serv[1]:undefined, cantidad, serv[0]==1?serv[1]:undefined, nombre, (precio*cantidad), precio)
      // console.log(prodVenta as intProductoVenta)
      this.prodServEntrega.push(prodVenta as intEntregaServicio)
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

  agregarDiagnosticos(){
    if (this.cliente) {
      this.diagModal.show()
    }else{
      Toast.fire({
        icon: "warning",
        title: "Agregue la nota para diagnosticar"
      })
    }
  }
}
