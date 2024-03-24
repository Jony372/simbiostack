import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquiposService } from '../../../../services/equipos/equipos.service';
import { formEquipo, intEquipo } from '../../../../services/equipos/equipoInterfaz';

@Component({
  selector: 'app-agregar-equipo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-equipo.component.html',
  styleUrl: './agregar-equipo.component.css'
})
export class AgregarEquipoComponent {
  @Input() idCliente: number|undefined;
  @Input() addEquipo!: FormGroup;
  @Input() addEquipos!: Array<intEquipo | formEquipo>;
  @Input() equiposNuevos!: Array<formEquipo>;

  constructor(private formBuilder: FormBuilder, private equipoServicio: EquiposService){}

  

  mostrar(){
    const form = this.addEquipo;
    if(form.valid){
      const equipo = form.value
      console.log(equipo)
      this.addEquipos.push({...equipo} as intEquipo);
      this.addEquipo.reset({
        cargador: false,
        funda: false,
        usb: false,
        cables: false
      });
      // this.addEquipo.patchValue({cliente: this.idCliente})
      // this.equipoServicio.agregar(equipo as formEquipo, this.idCliente).subscribe({
      //   complete: () => {
      //     console.log("Se agrego el equipo correctamente")
      //   },
      //   error: err => console.error("Error al agregar el equipo: "+err.error)
      // })
    }else{  
      alert("Revise los datos, por favor "+this.idCliente)
    }
  }
}
