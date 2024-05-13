import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClienteService } from '../../../../services/clientes/cliente.service';
import { intCliente } from '../../../../services/clientes/clienteInterfaz';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { intProveedor } from '../../../../services/proveedor/interfazProveedor';
import { ProveedorService } from '../../../../services/proveedor/proveedor.service';
import { Toast } from '../../../../../assets/const';
import { ModalInterface } from 'flowbite';

@Component({
  selector: 'app-add-proveedores',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-proveedores.component.html',
  styleUrl: './add-proveedores.component.css'
})
export class AddProveedoresComponent {
  @Input() add!: boolean;
  @Input() proveedor!: intProveedor|undefined;
  @Input() modal!: ModalInterface;
  @Output() listo = new EventEmitter<intProveedor>
  
  constructor(private proveedorServicio:ProveedorService, private formBuilder:FormBuilder) {}

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.proveedor ) {
      this.addProveedor.patchValue(this.proveedor)
    }else{
      this.addProveedor.reset();
    }
  }

  addProveedor = this.formBuilder.group({
    id:[0],
    nombre:['', [Validators.required]],
    tel:['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]*")]],
    pagina:['']
  })

  agregar(){
    if(this.addProveedor.valid && this.add){
      const p = this.addProveedor.value
      this.proveedorServicio.agregarProveedor(
        p.nombre as string,
        p.tel,
        p.pagina
      ).subscribe({
        next: data => {
          Toast.fire({
            icon: 'success',
            title: 'Se agrego el proveedor ' + data.nombre
          })
          this.listo.emit(data);
        },
        error: err => {
          console.log(err)
          Toast.fire({
            icon: 'error',
            title: 'Error al guardar el proveedor: ' + err
          })
        },
        complete: () => {
          this.modal.hide()
        }
      })
    }else{
      Toast.fire({
        icon: 'warning',
        title: this.addProveedor.get('tel')?.errors?'Revise el formato del teléfono (10 dígitos)':'Llene los datos necesarios'
      });
      this.addProveedor.markAllAsTouched();
    }
  }

  editar(){
    if(this.addProveedor.valid && !this.add){
      const p = this.addProveedor.value;
      this.proveedorServicio.editarProveedor(
        p.id as number,
        p.nombre as string,
        p.tel,
        p.pagina 
      ).subscribe({
        next: data => {
          Toast.fire({
            icon: 'success',
            title: 'Se edito el proveedor ' + data.nombre
          })
        },
        error: err => {
          console.log(err)
          Toast.fire({
            icon: 'error',
            title: 'Error al editar el proveedor: ' + err
          })
        },
        complete: () => {
          this.modal.hide()
          this.listo.emit()
        }
      })
    }else{
      Toast.fire({
        icon: 'warning',
        title: this.addProveedor.get('tel')?.errors?'Revise el formato del teléfono (10 dígitos)':'Llene los datos necesarios'
      });
      this.addProveedor.markAllAsTouched();
    }
  }
}
