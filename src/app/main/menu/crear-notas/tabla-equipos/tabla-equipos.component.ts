import { Component, Input } from '@angular/core';
import { intEquipo } from '../../../../services/equipos/equipoInterfaz';
import { EquiposService } from '../../../../services/equipos/equipos.service';
import { intCliente } from '../../../../services/clientes/clienteInterfaz';

@Component({
  selector: 'app-tabla-equipos',
  standalone: true,
  imports: [],
  templateUrl: './tabla-equipos.component.html',
  styleUrl: './tabla-equipos.component.css'
})
export class TablaEquiposComponent {
  @Input() cliente!: intCliente;
  equipos!: Array<intEquipo>;
  addEquipos: Array<intEquipo> = [];
  equipoUsuario: number = 0;

  constructor(private equipoServicio: EquiposService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  ngOnChanges(){
    this.equipoServicio.mostrar().subscribe({
      next: data => {
        this.equipos = data.filter(equipo=>equipo.cliente.id === this.cliente?.id)
        this.equipoUsuario = this.equipos[0]?.id
      },
      error: err => console.error("Error al mostrar los equipos: "+err)
    })
  }

  onChangeSelect(id:any){
    this.equipoUsuario = id.target.value;
  }

  agregarEquipo(){
    // alert(this.equipoUsuario)
    const id = this.equipoUsuario
    console.log(id)
    if (id){
      this.addEquipos.push(this.equipos.find(equipo => equipo.id == id) as intEquipo)
      console.log(this.equipos.find(equipo => equipo.id == id) as intEquipo)
    }
  }

  editar(equipo: intEquipo){}

  eliminar(id: number){}
}
