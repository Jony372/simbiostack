import { Component } from '@angular/core';
import { intEquipo } from '../../services/equipos/equipoInterfaz';
import { intGetNotaEquipos, intNotaEquipo } from '../../services/notas/interfazNota';
import { NotasService } from '../../services/notas/notas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nota-equipo',
  standalone: true,
  imports: [],
  templateUrl: './nota-equipo.component.html',
  styleUrl: './nota-equipo.component.css'
})
export class NotaEquipoComponent {
  nota!: intGetNotaEquipos;
  equipos!: Array<intEquipo>;

  constructor(private notaServicio: NotasService, private route: ActivatedRoute){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let folio = this.route.snapshot.queryParamMap.get('folio') as string;
    this.notaServicio.getNota(parseInt(folio, 10)).subscribe({
      next: data => {
        this.nota = data;
        this.equipos = data.equipos;
      },
      error: err => console.error('Error al obtener la nota del equipo: '+err),
      complete: ()=> {
        print()
        window.addEventListener('afterprint', ()=> window.close())
      }
    })
  }

  extras(equipo: intEquipo): string{
    let extras = "";
    extras = equipo.cargador ? "Cargador " : "" + equipo.funda? "Funda ":"" + equipo.usb? "USB ": "" + equipo.cables?"Cables":"";
    return extras
  }
}
