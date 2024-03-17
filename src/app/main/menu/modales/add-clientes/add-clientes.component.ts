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
      this.addCliente.patchValue({
        id: this.cliente.id,
        nombre: this.cliente.nombre,
        tel: this.cliente.tel,
        direccion: this.cliente.direccion,
        observacion: this.cliente.observacion
      })
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
      this.clienteServicio.agregar(this.addCliente.value as intCliente).subscribe({
        error:err=>alert("Ocurrió un error al intentar guardar el cliente"),
        complete:()=>alert("Se agrego")
      })
    }else{
      console.log(this.addCliente.get('telefono')?.errors)
    }
  }

  editar(){
    if(this.addCliente.valid && !this.add){
      this.clienteServicio.editar(this.addCliente.value as intCliente).subscribe({
        error: err=>console.error("Ocurrió un error al editar el cliente: "+err),
        complete:()=>alert("Se edito el cliente")
      })
    }else{
      alert("Revisa los campos")
    }
  }
}
