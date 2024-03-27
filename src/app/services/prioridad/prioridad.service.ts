import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intPrioridad } from './interfazPrioridad';
import { handleError } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class PrioridadService {

  constructor(private http:HttpClient) { }

  mostrar():Observable<Array<intPrioridad>>{
    return this.http.get<Array<intPrioridad>>("http://localhost:8080/api/prioridades/mostrar").pipe(catchError(handleError));
  }
}
