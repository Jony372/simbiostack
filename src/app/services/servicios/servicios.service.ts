import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intServicios } from './interfazServicios';
import { handleError } from '../functions';
import { URL } from '../../../assets/const';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http:HttpClient) { }

  servicios():Observable<Array<intServicios>>{
    return this.http.get<Array<intServicios>>(`${URL}/api/servicios/servicios`).pipe(catchError(handleError));
  }

  agregarServicio(nombre: string, precio: number, descripcion: string):Observable<intServicios>{
    return this.http.post<intServicios>(`${URL}/api/servicios/agregar`, null, {params:{
      nombre: nombre,
      precio: precio,
      descripcion: descripcion
    }}).pipe(catchError(handleError));
  }

  editarServicio(id: number, nombre: string, precio: number, descripcion: string):Observable<intServicios>{
    return this.http.post<intServicios>(`${URL}/api/servicios/editar/${id}`, null, {params:{
      nombre: nombre,
      precio: precio,
      descripcion: descripcion
    }}).pipe(catchError(handleError));
  }

  eliminarServicio(id: number):Observable<any>{
    return this.http.post<any>(`${URL}/api/servicios/eliminar/${id}`, null).pipe(catchError(handleError));
  }

  prodServs():Observable<Array<any>>{
    return this.http.get<Array<any>>(`${URL}/api/servicios/prod-servs`).pipe(catchError(handleError));
  }
}
