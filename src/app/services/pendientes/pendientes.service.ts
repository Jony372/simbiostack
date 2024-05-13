import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { handleError } from '../functions';
import { addPendiente, intPendiente } from './pendientesInterface';


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

  agregarPendiente(nombre: string, cliente: number | undefined | null, usuario: number, prioridad: number, descripcion: string, fechaEstimada: string | undefined | null, estado: number, tipo: number):Observable<intPendiente>{
    let params = {
      nombre: nombre,
      usuario: usuario,
      prioridad: prioridad,
      descripcion: descripcion,
      estado: estado,
      tipo: tipo
    } as addPendiente

    cliente? params = {...params, cliente: cliente} : undefined;
    fechaEstimada? {...params, fechaEstimada: fechaEstimada} : undefined

    return this.http.post<intPendiente>("http://localhost:8080/api/pendientes/agregar", null, {params: {...params}})
  }

  editarPendiente(id: number, nombre: string, cliente: number | undefined | null, usuario: number, prioridad: number, descripcion: string, fechaEstimada: string | undefined | null, estado: number, tipo: number):Observable<intPendiente>{
    let params = {
      nombre: nombre,
      usuario: usuario,
      prioridad: prioridad,
      descripcion: descripcion,
      estado: estado,
      tipo: tipo
    } as addPendiente

    cliente? params = {...params, cliente: cliente} : undefined;
    fechaEstimada? {...params, fechaEstimada: fechaEstimada} : undefined

    return this.http.post<intPendiente>(`http://localhost:8080/api/pendientes/editar/${id}`,null, {params: {...params}})
  }

  cambiarEstado(id: number, opcion: number):Observable<any>{
    return this.http.post(`http://localhost:8080/api/pendientes/accion/${id}`, null, {params: {opcion: opcion}}).pipe(catchError(handleError))
  }
  modificarEstado(id:number, estado:number, prioridad: number):Observable<any>{
    return this.http.get(`http://localhost:8080/api/pendientes/modificar-estado`, {params: {
      id: id,
      estado: estado,
      prioridad: prioridad
    }}).pipe(catchError(handleError))
  }
}
