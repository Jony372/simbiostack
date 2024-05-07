import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmar',
  standalone: true,
  imports: [],
  templateUrl: './confirmar.component.html',
  styleUrl: './confirmar.component.css'
})
export class ConfirmarComponent {
  @Input() texto!: string;
  @Output() confirmar = new EventEmitter<undefined>;
  
  accion(op: boolean){
    if (op) {
      this.confirmar.emit();
    }
  }
}
