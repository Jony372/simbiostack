import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { handleError } from '../functions';
import { intPendiente } from './pendientesInterface';


@Injectable({
  providedIn: 'root'
})
export class PendientesService {

  constructor(private http: HttpClient ) { }
  
  pendientes():Observable<Array<Array<any>>>{
    return this.http.get<Array<Array<any>>>("http://localhost:8080/api/pendientes/vista").pipe(catchError(handleError));
  }

  mostrarPendientes():Observable<Array<intPendiente>>{
    return this.http.get<Array<intPendiente>>("http://localhost:8080/api/pendientes/mostrar").pipe(catchError(handleError));
  }

  getPendiente(id: number):Observable<intPendiente>{
    return this.http.get<intPendiente>(`http://localhost:8080/api/pendientes/get/${id}`).pipe(catchError(handleError));
  }
}
