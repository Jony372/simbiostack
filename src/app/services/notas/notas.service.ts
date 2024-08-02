import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { intGetNotaEquipos, intNotaEquipo } from './interfazNota';
import { Observable, catchError } from 'rxjs';
import { handleError } from '../functions';
import { intEquipo } from '../equipos/equipoInterfaz';
import { URL } from '../../../assets/const';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(private http:HttpClient) { }

  obtenerNotas():Observable<Array<intGetNotaEquipos>>{
    return this.http.get<Array<intGetNotaEquipos>>(`${URL}/api/notas/mostrar`).pipe(catchError(handleError))
  }

  agregar(prioridad: number, cliente: number, usuario: number):Observable<intNotaEquipo>{
    // console.log(prioridad+" "+cliente+" "+usuario);
    return this.http.post<intNotaEquipo>(`${URL}/api/notas/agregar`, null, {params:{
      prioridad: prioridad,
      cliente: cliente,
      usuario: usuario
    }}).pipe(catchError(handleError))
  }

  agregarNotas(nota:number, equipo:number):Observable<any>{
    return this.http.post(`${URL}/api/nota-equipo/agregar`, null, {params: {
      nota: nota,
      equipo: equipo
    }})
  }

  getNota(id:number):Observable<intGetNotaEquipos>{
    return this.http.get<intGetNotaEquipos>(`${URL}/api/notas/get-nota/${id||1}`).pipe(catchError(handleError))
  }

  modificarEstado(id:number, estado:number, prioridad: number):Observable<any>{
    return this.http.get(`${URL}/api/notas/modificar-estado`, {params: {
      id: id,
      estado: estado,
      prioridad: prioridad
    }}).pipe(catchError(handleError))
  }

  notasTrabajando():Observable<Array<number>>{
    return this.http.get<Array<number>>(`${URL}/api/notas/notas-trabajando`).pipe(catchError(handleError));
  }

  cambiarEstado(id: number, opcion: number):Observable<any>{
    return this.http.post(`${URL}/api/notas/accion/${id}`, null, {params: {opcion: opcion}}).pipe(catchError(handleError))
  }
}
