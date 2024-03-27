import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquiposService } from '../../../../services/equipos/equipos.service';
import { formEquipo, intEquipo } from '../../../../services/equipos/equipoInterfaz';
import { intTipo } from '../../../../services/tipo/interfazTipo';
import { TipoService } from '../../../../services/tipo/tipo.service';

@Component({
  selector: 'app-agregar-equipo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-equipo.component.html',
  styleUrl: './agregar-equipo.component.css'
})
export class AgregarEquipoComponent {
  @Output() crear = new EventEmitter;
  @Input() idCliente: number|undefined;
  @Input() addEquipo!: FormGroup;
  @Input() addEquipos!: Array<intEquipo | formEquipo>;
  @Input() equiposNuevos!: Array<formEquipo>;
  pendientes!: Array<intTipo>

  constructor(private formBuilder: FormBuilder, private equipoServicio: EquiposService, private tipoPendServicio: TipoService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.tipoPendServicio.mostrar().subscribe({
      next: data => this.pendientes = data,
      error: err => console.error("Error al mostrar los pendientes: "+err)
    })
  }
  

  mostrar(){
    const form = this.addEquipo;
    if(form.valid){
      const equipo = form.value
      console.log(equipo)
      this.addEquipos.push({...equipo} as formEquipo);
      this.addEquipo.reset({
        tipoPendiente: "",
        cargador: false,
        funda: false,
        usb: false,
        cables: false
      });
    }else{
      form.markAllAsTouched();
      alert("Revise los datos, por favor "+this.idCliente)
    }
  }
  crearNota(){
    this.crear.emit()
  }
}
