import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { formEquipo, intEquipo } from './equipoInterfaz';
import { handleError } from '../functions';
import { param } from 'jquery';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private http: HttpClient) { }

  agregar(equipo: formEquipo, cliente:number):Observable<any>{
      return this.http.post<any>("http://localhost:8080/api/equipos/agregar", null, {params:{...equipo, cliente: cliente}}).pipe(catchError(handleError))
    }

  mostrar():Observable<Array<intEquipo>>{
    return this.http.get<Array<intEquipo>>("http://localhost:8080/api/equipos/mostrar").pipe(catchError(handleError));
  }
}
