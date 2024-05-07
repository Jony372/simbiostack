import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intServicios } from './interfazServicios';
import { handleError } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http:HttpClient) { }

  servicios():Observable<Array<intServicios>>{
    return this.http.get<Array<intServicios>>("http://localhost:8080/api/servicios/servicios").pipe(catchError(handleError));
  }

  agregarServicio(nombre: string, precio: number, descripcion: string):Observable<intServicios>{
    return this.http.post<intServicios>("http://localhost:8080/api/servicios/agregar", null, {params:{
      nombre: nombre,
      precio: precio,
      descripcion: descripcion
    }}).pipe(catchError(handleError));
  }

  editarServicio(id: number, nombre: string, precio: number, descripcion: string):Observable<intServicios>{
    return this.http.post<intServicios>(`http://localhost:8080/api/servicios/editar/${id}`, null, {params:{
      nombre: nombre,
      precio: precio,
      descripcion: descripcion
    }}).pipe(catchError(handleError));
  }

  eliminarServicio(id: number):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/api/servicios/eliminar/${id}`, null).pipe(catchError(handleError));
  }

  prodServs():Observable<Array<any>>{
    return this.http.get<Array<any>>("http://localhost:8080/api/servicios/prod-servs").pipe(catchError(handleError));
  }
}
