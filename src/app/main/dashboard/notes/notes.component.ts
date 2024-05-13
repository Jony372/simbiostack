import { Component } from '@angular/core';
import { Toast } from '../../../../assets/const';
import { NotitaService } from '../../../services/notita/notita.service';
import { intNotita } from '../../../services/notita/notitaInterface';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  notitas!: Array<intNotita>;

  constructor(private notitaServicio: NotitaService){}

  ngOnInit(){
    this.actualizar();
  }

  actualizar(){
    this.notitas = [];
    this.notitaServicio.mostrarNotitas().subscribe({
      next: data => {
        this.notitas = data
      },
      error: err => {
        Toast.fire({
          icon: 'error',
          title: 'Error al mostrar las notitas '+err
        })
      }
    })
  }

  addTextarea() {
    this.notitaServicio.agregarNotita().subscribe({
      error: err => {
        Toast.fire({
          icon: 'error',
          title: 'Error al agregar la notita '+err
        })
      },
      complete: () => this.actualizar()
    })
  }

  dropNote(id: number){
    this.notitaServicio.eliminarNotita(id).subscribe({
      error: err => {
        Toast.fire({
          icon: 'error',
          title: 'Error al eliminar la notita '+err
        })
      },
      complete: () => this.actualizar()
    })
  }
  
  actualizarNotita(id: number, evt: any){
    const des = evt.target.value
    this.notitaServicio.editarNotita(id, des).subscribe({
      error: err => {
        Toast.fire({
          icon: 'error',
          title: 'Error al editar la notita '+err
        })
      }
    })
  }
}
