import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClienteService } from '../../../../services/clientes/cliente.service';
import { intCliente } from '../../../../services/clientes/clienteInterfaz';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalInterface } from 'flowbite';
import { Toast } from '../../../../../assets/const';
import { emit } from 'process';

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
  @Input() modal!: ModalInterface;
  @Output() listo = new EventEmitter<intCliente>;
  
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
      const cliente = this.addCliente.value
      this.clienteServicio.agregar(
        cliente.nombre as string,
        cliente.tel as string,
        cliente.direccion as string,
        cliente.observacion as string
      ).subscribe({
        next: data => {
          Toast.fire({
            icon: 'success',
            title: 'Se agrego el cliente ' + data.nombre
          })
          this.listo.emit(data);
        },
        error:err=>{
          Toast.fire({
            icon: 'error',
            title: 'Error al agregar el cliente, inténtelo de nuevo'
          })
          console.error('Error ' + err)
        },
        complete:()=>{
          this.modal.hide();
        }
      })
    }else{
      Toast.fire({
        icon: 'warning',
        title: this.addCliente.get('tel')?.errors?'Revise el formato del teléfono (10 dígitos)':'Llene los datos necesarios'
      });
      this.addCliente.markAllAsTouched();
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
        next: data => {
          Toast.fire({
            icon: 'success',
            title: 'Se edito el cliente ' + data.nombre
          })
        },
        error:err=>{
          Toast.fire({
            icon: 'error',
            title: 'Error al editar el cliente, inténtelo de nuevo'
          })
          console.error('Error ' + err)
        },
        complete:()=>{
          this.modal.hide()
          this.listo.emit();
        }
      })
    }else{
      Toast.fire({
        icon: 'warning',
        title: this.addCliente.get('tel')?.errors?'Revise el formato del teléfono (10 dígitos)':'Llene los datos necesarios'
      });
      this.addCliente.markAllAsTouched();
    }
  }
}
