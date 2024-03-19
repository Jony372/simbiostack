import { Component, Input } from '@angular/core';
import { ClienteService } from '../../../../services/clientes/cliente.service';
import { intCliente } from '../../../../services/clientes/clienteInterfaz';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-clientes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-clientes.component.html',
  styleUrl: './add-clientes.component.css'
})
export class AddClientesComponent {
  @Input() add!: boolean;
  @Input() cliente!: intCliente|undefined;
  
  constructor(private clienteServicio:ClienteService, private formBuilder:FormBuilder) {}

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.cliente ) {
      this.addCliente.patchValue(this.cliente)
    }else{
      this.addCliente.reset();
    }
  }

  addCliente = this.formBuilder.group({
    id:[0],
    nombre:['', [Validators.required]],
    tel:['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]*")]],
    direccion:[""],
    observacion:[""]
  })

  agregar(){
    if(this.addCliente.valid && this.add){
      console.log(this.addCliente.value)
      const cliente = this.addCliente.value
      this.clienteServicio.agregar(
        cliente.nombre as string,
        cliente.tel as string,
        cliente.direccion as string,
        cliente.observacion as string
      ).subscribe({
        error:err=>alert("Ocurrió un error al intentar guardar el cliente"),
        complete:()=>alert("Se agrego")
      })
    }else{
      console.log(this.addCliente.get('telefono')?.errors)
    }
  }

  editar(){
    if(this.addCliente.valid && !this.add){
      const cliente = this.addCliente.value;
      this.clienteServicio.editar(
        cliente.id as number,
        cliente.nombre as string,
        cliente.tel as string,
        cliente.direccion as string,
        cliente.observacion as string
      ).subscribe({
        error: err=>console.error("Ocurrió un error al editar el cliente: "+err),
        complete:()=>alert("Se edito el cliente")
      })
    }else{
      alert("Revisa los campos")
    }
  }
}
