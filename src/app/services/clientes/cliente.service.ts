import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intCliente } from './clienteInterfaz';
import { handleError } from '../functions';
import { URL } from '../../../assets/const';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  agregar(nombre: string, tel:string, direccion:string, observacion:string):Observable<intCliente>{
    return this.http.post<intCliente>(`${URL}/api/cliente/agregar`, null, {params:{
      nombre: nombre,
      tel: tel,
      direccion: direccion,
      observacion: observacion
    }}).pipe(catchError(handleError));
  }

  editar(id: number, nombre: string, tel:string, direccion:string, observacion:string):Observable<intCliente>{
    return this.http.post<intCliente>(`${URL}/api/cliente/editar`, null, {params:{
      id:id,
      nombre: nombre,
      tel: tel,
      direccion: direccion,
      observacion: observacion
    }}).pipe(catchError(handleError));
  }

  eliminar(id:number):Observable<any>{
    return this.http.get<any>(`${URL}/api/cliente/eliminar/${id}`).pipe(catchError(error => handleError(error)));
  }

  mostrar():Observable<Array<intCliente>>{
    return  this.http.get<Array<intCliente>>(`${URL}/api/cliente/mostrar`).pipe(catchError(handleError));
  }

  nextId():Observable<number>{
    return this.http.get<number>(`${URL}/api/cliente/next`).pipe(catchError(handleError))
  }

}
