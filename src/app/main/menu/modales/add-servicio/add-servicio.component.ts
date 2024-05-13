import { Component, EventEmitter, Input, Output } from '@angular/core';
import { intServicios } from '../../../../services/servicios/interfazServicios';
import { ServiciosService } from '../../../../services/servicios/servicios.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalInterface } from 'flowbite';
import { Toast } from '../../../../../assets/const';

@Component({
  selector: 'app-add-servicio',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-servicio.component.html',
  styleUrl: './add-servicio.component.css'
})
export class AddServicioComponent {
  @Input() add!: boolean;
  @Input() servicio!: intServicios|undefined;
  @Input() modal!: ModalInterface;
  @Output() listo = new EventEmitter<null>

  constructor(private servicioServicio:ServiciosService ,private formbuilder: FormBuilder){
    // this.producto = new Object as intProducto
    // this.getProd.obtenerProducto(this.id).subscribe({
    //   next: prod => this.producto = prod,
    //   error: err=> console.error("Error al obtener los datos: "+err)
    // })
  }

  ngOnChanges(): void {

    if (this.servicio) {
      this.addServicio.patchValue({
        ...this.servicio
      })
    }else{
      this.addServicio.reset();
    }
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
  }
  
  addServicio = this.formbuilder.group({
    id:[0],
    nombre:["", [Validators.required]],
    precio:[0, [Validators.required]],
    descripcion:["", [Validators.required]]
  });

  agregar() {
    if (this.addServicio.valid && this.add) {
      // console.log(this.addProducto.value);
      const productos=this.addServicio.value;
      this.servicioServicio.agregarServicio(
        productos.nombre as string,
        productos.precio as number,
        productos.descripcion as string
        ).subscribe({
          next: data => {
            Toast.fire({
              icon: 'success',
              title: 'Se agrego el servicio ' + data.nombre
            })
          },
          error: err => {
            Toast.fire({
              icon: 'error',
              title: 'Error al agregar el servicio: ' + err
            })
          },
          complete: () => {
            this.listo.emit();
            this.modal.hide();
          }
      });
    }else{
      Toast.fire({
        icon: 'warning',
        title: 'Revise los datos e inténtelo de nuevo por favor'
      });
      this.addServicio.markAllAsTouched();
    }
  }
  
  editar(){
    if(this.addServicio.valid && !this.add){
      const servicio=this.addServicio.value;
      this.servicioServicio.editarServicio(
        servicio.id as number,
        servicio.nombre as string,
        servicio.precio as number,
        servicio.descripcion as string
        ).subscribe({
          next: data => {
            Toast.fire({
              icon: 'success',
              title: 'Se edito el servicio ' + data.nombre
            })
          },
          error: err => {
            Toast.fire({
              icon: 'error',
              title: 'Error al editar el servicio: ' + err
            })
          },
          complete: () => {
            this.listo.emit();
            this.modal.hide();
          }
      });
    }else{
      Toast.fire({
        icon: 'warning',
        title: 'Revise los datos e inténtelo de nuevo por favor'
      });
      this.addServicio.markAllAsTouched();
    }
  }

  accion(){
    if (this.add) {
      this.agregar()
    }else{
      this.editar()
    }
  }
}
