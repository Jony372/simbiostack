import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { intGetNotaEquipos, intNotaEquipo } from './interfazNota';
import { Observable, catchError } from 'rxjs';
import { handleError } from '../functions';
import { intEquipo } from '../equipos/equipoInterfaz';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(private http:HttpClient) { }

  agregar(prioridad: number, cliente: number, usuario: number):Observable<intNotaEquipo>{
    // console.log(prioridad+" "+cliente+" "+usuario);
    return this.http.post<intNotaEquipo>("http://localhost:8080/api/notas/agregar", null, {params:{
      prioridad: prioridad,
      cliente: cliente,
      usuario: usuario,
      estado: 1
    }}).pipe(catchError(handleError))
  }

  agregarNotas(nota:number, equipo:number):Observable<any>{
    return this.http.post("http://localhost:8080/api/nota-equipo/agregar", null, {params: {
      nota: nota,
      equipo: equipo
    }})
  }

  getNota(id:number):Observable<intGetNotaEquipos>{
    return this.http.get<intGetNotaEquipos>(`http://localhost:8080/api/notas/get-nota/${id}`).pipe(catchError(handleError))
  }
}
