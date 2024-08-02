import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { intEstado } from './interfazEstado';
import { URL } from '../../../assets/const';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private http: HttpClient) { }

  mostrarEstados():Observable<Array<intEstado>>{
    return this.http.get<Array<intEstado>>(`${URL}/api/estados-nota/mostrar`);
  }

}
