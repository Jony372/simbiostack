import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { handleError } from '../functions';
import { addPendiente, intPendiente } from './pendientesInterface';
import { URL } from '../../../assets/const';


@Injectable({
  providedIn: 'root'
})
export class PendientesService {

  constructor(private http: HttpClient ) { }
  
  pendientes():Observable<Array<Array<any>>>{
    return this.http.get<Array<Array<any>>>(`${URL}/api/pendientes/vista`).pipe(catchError(handleError));
  }

  mostrarPendientes():Observable<Array<intPendiente>>{
    return this.http.get<Array<intPendiente>>(`${URL}/api/pendientes/mostrar`).pipe(catchError(handleError));
  }

  getPendiente(id: number):Observable<intPendiente>{
    return this.http.get<intPendiente>(`${URL}/api/pendientes/get/${id}`).pipe(catchError(handleError));
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

    return this.http.post<intPendiente>(`${URL}/api/pendientes/agregar`, null, {params: {...params}})
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

    return this.http.post<intPendiente>(`${URL}/api/pendientes/editar/${id}`,null, {params: {...params}})
  }

  cambiarEstado(id: number, opcion: number):Observable<any>{
    return this.http.post(`${URL}/api/pendientes/accion/${id}`, null, {params: {opcion: opcion}}).pipe(catchError(handleError))
  }
  modificarEstado(id:number, estado:number, prioridad: number):Observable<any>{
    return this.http.get(`${URL}/api/pendientes/modificar-estado`, {params: {
      id: id,
      estado: estado,
      prioridad: prioridad
    }}).pipe(catchError(handleError))
  }
}
