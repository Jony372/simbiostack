import { Component } from '@angular/core';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  textareas: string[] = [];

  addTextarea() {
    this.textareas.push('text');
  }

  dropNote(pos: number){
    this.textareas.splice(pos, 1);
    console.log(pos)
  }
}
