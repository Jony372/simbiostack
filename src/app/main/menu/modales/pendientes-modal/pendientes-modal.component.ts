import { Component, Input } from '@angular/core';
import { intPendiente } from '../../../../services/pendientes/pendientesInterface';

@Component({
  selector: 'app-pendientes-modal',
  standalone: true,
  imports: [],
  templateUrl: './pendientes-modal.component.html',
  styleUrl: './pendientes-modal.component.css'
})
export class PendientesModalComponent {
  @Input() pendiente!: intPendiente;



}
