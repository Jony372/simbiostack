import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intEquipo } from './equipoInterfaz';
import { handleError } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private http: HttpClient) { }

  agregar(){}

  mostrar():Observable<Array<intEquipo>>{
    return this.http.get<Array<intEquipo>>("http://localhost:8080/api/equipos/mostrar").pipe(catchError(handleError));
  }
}
