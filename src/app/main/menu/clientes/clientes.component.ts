import { Component } from '@angular/core';
import { ClienteService } from '../../../services/clientes/cliente.service';
import { intCliente } from '../../../services/clientes/clienteInterfaz';
import { AddClientesComponent } from '../modales/add-clientes/add-clientes.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [AddClientesComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  add : boolean = true;
  cliente!:intCliente|undefined;
  clientes!:Array<intCliente>

  constructor(private clienteServicio:ClienteService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.clienteServicio.mostrar().subscribe({
      next:(response)=>this.clientes = response,
      error:error =>  console.error('Ocurrió un error al mostrar los clientes: '+error)
    })
  }

  eliminar(id:number){
    this.clienteServicio.eliminar(id).subscribe({
      next:data=>console.log(data),
      error: err=>console.error("No se elimino: "+err),
      complete: ()=>{
        alert("Se elimino el cliente")
        this.clientes = this.clientes.filter(cli => cli.id != id);
      }
    })
  }

  editar(cliente:intCliente){
    this.add = false;
    this.cliente = cliente;
  }

  agregar(){
    this.add=true;
    this.cliente = undefined;
  }
}
