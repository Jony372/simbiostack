import { Component, Input } from '@angular/core';
import { intEquipo } from '../../../../services/equipos/equipoInterfaz';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DiagnosticoService } from '../../../../services/diagnostico/diagnostico.service';
import { intDiagnostico } from '../../../../services/diagnostico/diagnosticoInterface';
import { Toast } from '../../../../../assets/const';
import Swal from 'sweetalert2';
import { animate } from '@angular/animations';
import { ModalInterface } from 'flowbite';

@Component({
  selector: 'app-diagnosticos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './diagnosticos.component.html',
  styleUrl: './diagnosticos.component.css'
})
export class DiagnosticosComponent {
  @Input() equipos!: Array<intEquipo> | undefined;
  @Input() modal!: ModalInterface;
  forms!: Array<FormGroup>

  constructor(private formBuilder: FormBuilder, private diagnosticoServicio: DiagnosticoService){}

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.forms = [];
    this.equipos?.forEach(() => this.forms.push(this.createItemFormGroup()))
  }

  createItemFormGroup(): FormGroup {
    let f = this.formBuilder.group({
      diagnostico: ["", [Validators.required]],
      pantallaRota: [false, [Validators.required]],
      cargador: [true, [Validators.required]],
      enciende: [true, [Validators.required]],
      bisagras: [false, [Validators.required]],
      ram: [0, [Validators.required]],
      almacenamiento: ["", [Validators.required]]
    });
    f.reset({
      pantallaRota: false,
      cargador: false,
      enciende: false,
      bisagras: false
    })
    return f;
  }

  guardarDiagnositco(index: number, equipo: number){
    const form = this.forms[index];
    const val = form.value as intDiagnostico;

    if(form.valid){
      Swal.fire({
        background: "#67e8f9",
        showConfirmButton: true,
        confirmButtonColor: "#046c4e",
        confirmButtonText: "Guardar",
        showCancelButton: true,
        cancelButtonText: "Cerrar",
        allowOutsideClick: false,
        color: "#222",
        text: "¿Desea guardar el diagnostico? No podrás editar el diagnostico después",
        titleText: "Guardar diagnostico",
        animation: true
      }).then(data => {
        if(data.isConfirmed && form.valid){
          this.diagnosticoServicio.agregarDiagnostico(val, equipo).subscribe({
            error: err => {
              Toast.fire({
                icon: "error",
                title: "Error al guardar el diagnostico"
              })
              console.error("Error al guardar el diagnostico: "+err)
            },
            complete: () =>{
              Toast.fire({
                icon: "success",
                title: "Se guardo con éxito el diagnostico"
              })
            }
          })
        }
      })
    }else{
      form.markAllAsTouched()
      Toast.fire({
        icon: "warning",
        title: "Llene los datos del formulario, por favor"
      })
    }

    
  }

}
