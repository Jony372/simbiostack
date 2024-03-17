import { Component } from '@angular/core';
import { PendientesService } from '../../../services/pendientes/pendientes.service';
import { pendienteInt } from '../../../services/pendientes/pendientesInterface';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  pendientes: Array<pendienteInt> = [];

  constructor(private pendServ: PendientesService){
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.pendServ.pendientes().subscribe({
      next:(data)=>{
        // console.log(data);
        data.map(pendiente => this.pendientes.push(pendiente))
      },
      error: (errorMessage)=> {
        alert("ERROR")
        console.error(errorMessage);
      }
    });
    
  }


}
