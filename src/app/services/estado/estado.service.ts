import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { intEstado } from './interfazEstado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private http: HttpClient) { }

  mostrarEstados():Observable<Array<intEstado>>{
    return this.http.get<Array<intEstado>>('http://localhost:8080/api/estados-nota/mostrar');
  }

}
