import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquiposService } from '../../../../services/equipos/equipos.service';
import { formEquipo } from '../../../../services/equipos/equipoInterfaz';

@Component({
  selector: 'app-agregar-equipo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-equipo.component.html',
  styleUrl: './agregar-equipo.component.css'
})
export class AgregarEquipoComponent {
  @Input() idCliente: number|undefined;

  constructor(private formBuilder: FormBuilder, private equipoServicio: EquiposService){}

  addEquipo = this.formBuilder.group({
    tipo:["", [Validators.required]],
    marca:["", [Validators.required]],
    modelo: [""],
    color: ["", [Validators.required]],
    pass: [""],
    problema: ["", [Validators.required]],
    cargador: [false],
    funda: [false],
    usb: [false],
    cables: [false],
    extras: [""]
  })

  mostrar(){
    const form = this.addEquipo;
    if(form.valid && this.idCliente){
      const equipo = form.value
      this.equipoServicio.agregar(equipo as formEquipo, this.idCliente).subscribe({
        complete: () => {
          console.log("Se agrego el equipo correctamente")
        },
        error: err => console.error("Error al agregar el equipo: "+err.error)
      })
    }else{  
      alert("Revise los datos, por favor "+this.idCliente)
    }
  }
}
