import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intEntregaServicio, intNotaEntrega } from './notaEntregaInterface';
import { handleError } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {

  constructor(private http: HttpClient) { }

  crearNotaEntrega(usuario: number, cliente: number, total: number, estado: number, isEfectivo: boolean, nota: number):Observable<intNotaEntrega>{
    return this.http.post<intNotaEntrega>("http://localhost:8080/api/nota-entrega/agregar", null, {params:{
      usuario: usuario,
      cliente: cliente,
      total: total,
      estado: estado,
      isEfectivo: isEfectivo,
      nota: nota
    }}).pipe(catchError(handleError))
  }

  agregarEntregaServicio(tipo: number, notaEntrega: number, servicio: number | undefined, cantidad: number, producto: number | undefined, nombre: string, subTotal: number, precio: number):Observable<intEntregaServicio>{
    if (tipo === 1 && producto) {
      return this.http.post<intEntregaServicio>("http://localhost:8080/api/entregaservicio/agregar-producto", null, {params: {
        notaEntrega: notaEntrega,
        cantidad: cantidad,
        producto: producto,
        nombre: nombre,
        subTotal: subTotal,
        precio: precio
      }}).pipe(catchError(handleError));
    }else{
      return this.http.post<intEntregaServicio>("http://localhost:8080/api/entregaservicio/agregar-servicio", null, {params: {
        notaEntrega: notaEntrega,
        servicio: servicio as number,
        cantidad: cantidad,
        nombre: nombre,
        subTotal: subTotal,
        precio: precio
      }}).pipe(catchError(handleError));
    }
  }
  obtenerNota(id: number):Observable<intNotaEntrega>{
    return this.http.get<intNotaEntrega>(`http://localhost:8080/api/nota-entrega/get/${id}`).pipe(catchError(handleError))
  }

  getEntregaServicio(id: number):Observable<Array<intEntregaServicio>>{
    return this.http.get<Array<intEntregaServicio>>(`http://localhost:8080/api/entregaservicio/mostrar-es/${id}`).pipe(catchError(handleError));
  }
}
