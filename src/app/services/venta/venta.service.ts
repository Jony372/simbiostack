import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { param } from 'jquery';
import { Observable, catchError } from 'rxjs';
import { intProductoVenta, intVenta } from './ventaInterface';
import { handleError } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) { }

  agregarVenta(usuario: number, cliente: number, total: number, estado: number, isEfectivo: number):Observable<intVenta>{
    return this.http.post<intVenta>('http://localhost:8080/api/ventas/agregar', null, {params:{
      'usuario': usuario,
      'cliente': cliente,
      'total': total,
      'estado': estado,
      'isEfectivo': isEfectivo
    }}).pipe(catchError(handleError))
  }

  agregarVentaProducto(venta: number, producto: number | undefined, cantidad: number, subTotal: number, precio: number, nombre: string):Observable<intProductoVenta>{
    return this.http.post<intProductoVenta>('http://localhost:8080/api/ventas/agregar-vp', null, {params:{
      'venta': venta,
      'producto': producto?producto:1,
      'cantidad': cantidad,
      'subTotal': subTotal,
      'precio': precio,
      'nombreProducto': nombre
    }}).pipe(catchError(handleError))
  }

  mostrarVentas():Observable<Array<intVenta>>{
    return this.http.get<Array<intVenta>>('http://localhost:8080/api/ventas/mostrar').pipe(catchError(handleError))
  }

  mostrarVenta(id: number):Observable<intVenta>{
    return this.http.get<intVenta>(`http://localhost:8080/api/ventas/get-venta/${id}`).pipe(catchError(handleError))
  }

  mostrarVentaProducto(id: number):Observable<Array<intProductoVenta>>{
    return this.http.get<Array<intProductoVenta>>(`http://localhost:8080/api/ventas/mostrar-vp/${id}`).pipe(catchError(handleError))
  }

  mostrarVentasPorCobrar():Observable<Array<any>>{
    return this.http.get<Array<any>>('http://localhost:8080/api/ventas/por-pagar').pipe(catchError(handleError))
  }

  pagarVenta(id: number, tipo: number, isEfectivo: number):Observable<any>{
    if (tipo === 1) {
      return this.http.get<any>(`http://localhost:8080/api/ventas/pagar/${id}`, {params:{
        isEfectivo: isEfectivo
      }}).pipe(catchError(handleError))
    }else{
      return this.http.get<any>(`http://localhost:8080/api/nota-entrega/pagar/${id}`, {params:{
        isEfectivo: isEfectivo
      }}).pipe(catchError(handleError))
    }
  }

  cancelarVenta(id: number):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/api/ventas/cancelar/${id}`, null).pipe(catchError(handleError))
  }

  filtrarVentas(search: string):Observable<Array<intVenta>>{
    return this.http.get<Array<intVenta>>(`http://localhost:8080/api/ventas/filtro`, {params:{
      'search': search
    }}).pipe(catchError(handleError))
  }
}
