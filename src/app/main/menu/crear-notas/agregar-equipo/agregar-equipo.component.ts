import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-equipo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-equipo.component.html',
  styleUrl: './agregar-equipo.component.css'
})
export class AgregarEquipoComponent {

  constructor(private formBuilder: FormBuilder){}

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
    extra: [""]
  })

  mostrar(){
    const form = this.addEquipo;
    if(form.valid){

    }
  }
}
