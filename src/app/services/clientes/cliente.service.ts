import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intCliente } from './clienteInterfaz';
import { handleError } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  agregar(cliente:intCliente):Observable<any>{
    return this.http.post<any>("http://localhost:8080/api/cliente/agregar", cliente).pipe(catchError(handleError));
  }

  editar(cliente:intCliente):Observable<any>{
    return this.http.post<any>("http://localhost:8080/api/cliente/editar", cliente).pipe(catchError(handleError));
  }

  eliminar(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/cliente/eliminar/${id}`).pipe(catchError(handleError));
  }

  mostrar():Observable<Array<intCliente>>{
    return  this.http.get<Array<intCliente>>("http://localhost:8080/api/cliente/mostrar").pipe(catchError(handleError));
  }

}
