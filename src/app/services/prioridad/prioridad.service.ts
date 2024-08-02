import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intPrioridad } from './interfazPrioridad';
import { handleError } from '../functions';
import { URL } from '../../../assets/const';

@Injectable({
  providedIn: 'root'
})
export class PrioridadService {

  constructor(private http:HttpClient) { }

  mostrar():Observable<Array<intPrioridad>>{
    return this.http.get<Array<intPrioridad>>(`${URL}/api/prioridades/mostrar`).pipe(catchError(handleError));
  }
}
