import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/clientes/cliente.service';
import { intCliente } from '../../../services/clientes/clienteInterfaz';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { AgregarEquipoComponent } from './agregar-equipo/agregar-equipo.component';
import { TablaEquiposComponent } from './tabla-equipos/tabla-equipos.component';
import { UsuarioClienteComponent } from './usuario-cliente/usuario-cliente.component';
import { formEquipo, intEquipo } from '../../../services/equipos/equipoInterfaz';
import { EquiposService } from '../../../services/equipos/equipos.service';
import { NotasService } from '../../../services/notas/notas.service';
import { intNotaEquipo } from '../../../services/notas/interfazNota';
import { Toast } from '../../../../assets/const';

@Component({
  selector: 'app-crear-notas',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, UsuarioClienteComponent, AgregarEquipoComponent, TablaEquiposComponent],
  templateUrl: './crear-notas.component.html',
  styleUrl: './crear-notas.component.css'
})
export class CrearNotasComponent {
  cliente!: intCliente;
  idUsuario!: number|undefined|null;
  // next!: number;
  equipos!: Array<intEquipo | formEquipo>;
  equiposNuevos: Array<formEquipo> = [];
  addEquipos: Array<intEquipo | formEquipo> = [];
  cliUser: FormGroup = this.formBuilder.group({
    prioridad:[2],
    cliente:["", [Validators.required]],
    tel:['', [Validators.required]],
    usuario: [0, [Validators.required]]
  })
  addEquipo:FormGroup = this.formBuilder.group({
    tipoPendiente: [0, [Validators.required]],
    cliente:[0],
    id:[0],
    tipo:["", [Validators.required]],
    marca:["", [Validators.required]],
    modelo: [""],
    color: ["", [Validators.required]],
    pass: [""],
    problema: ["", [Validators.required]],
    cargador: [true],
    funda: [false],
    usb: [false],
    cables: [false],
    extras: [""]
  })


  constructor(private notaServicio: NotasService, private clienteServicio:ClienteService, private usuarioServicio: UsuariosService, private formBuilder: FormBuilder, private equipoServicio: EquiposService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cliUser.reset({
      prioridad: 2,
      usuario: ""
    })
    this.addEquipo.reset({
      tipoPendiente: "",
      cargador: false,
      funda: false,
      usb: false,
      cables: false
    })
    // this.clienteServicio.nextId().subscribe({
    //   next: data => {
    //     this.next = data
    //     // this.addEquipo.patchValue({cliente: data})
    //   },
    //   error: err => console.error("Error al obtener el siguiente cliente: "+err) 
    // });
  }

  elegirCliente(cliente: intCliente){
    this.cliente=cliente;
  }

  crearNota(){
    if(this.cliUser.valid &&  this.addEquipos.length > 0){

      this.equiposNuevos = this.addEquipos.filter(equipo => !equipo.cliente) as Array<formEquipo>
      if(this.cliente){
        this.agregarEquipos();
      }else{
        this.agregarCliente();
      }
    }else{
      const alerta = this.cliUser.invalid ? "Faltan datos por llenar" : "Agregue al menos un equipo";
      Toast.fire({
        icon: 'warning',
        title: alerta
      })
      this.cliUser.markAllAsTouched();
    }
    // console.log(this.equiposNuevos)
    // console.log(this.addEquipos)
  }

  agregarCliente(){
    const clienteForm = this.cliUser.value;
    if(this.cliUser.valid && this.addEquipos.length > 0 ) {
      this.clienteServicio.agregar(clienteForm.cliente, clienteForm.tel, "", "").subscribe({
        next: data => this.cliente = data,
        error: err => console.error("Error al crear el cliente: "+err),
        complete: ()=> this.agregarEquipos()
      })
    }else{
      this.cliUser.markAllAsTouched();
      alert("Rellene los datos")
    }
  }

  agregarEquipos(){
    if (this.equiposNuevos.length > 0) {
      this.equiposNuevos.forEach((equipo, i) => {
        console.log(equipo)

        const indice = this.addEquipos.findIndex(eq => eq === equipo);
        this.addEquipos.splice(indice, 1);

        this.equipoServicio.agregar(equipo, this.cliente?.id).subscribe({
          next: data => this.addEquipos.push(data),
          error: err => {
            console.error(`Error al agregar el equipo ${equipo.tipo +"-"+ equipo.marca} a la nota: `+err)
            return
          },
          complete: ()=> {
            if (i == this.equiposNuevos.length-1) {
              this.nota()
            }
          }
        })
      })
    }else{
      this.nota();
    }
  }

  nota(){
    // console.log(this.cliUser.value)
    let nota: intNotaEquipo;
    let formNota = this.cliUser.value;
    // console.log(this.addEquipos)
    this.notaServicio.agregar(formNota.prioridad, this.cliente.id, formNota.usuario).subscribe({
      next: data => nota = data,
      error: err =>  console.error('Error al crear la nota: '+err),
      complete: ()=>{
        this.addEquipos.forEach((equipo, i) => {
          this.notaServicio.agregarNotas(nota.id, equipo.id).subscribe({
            error: err=> console.error("Error al agregar las notas: "+err),
            complete: ()=>{
              console.log(i)
              if(this.addEquipos.length -1 == i){
                // alert("Acabamos lol")
                window.open(`http://localhost:4200/nota-equipo?folio=${nota.id}`)
                window.location.reload();
              }
            }
          })
        })
      }
    })
  }
}

