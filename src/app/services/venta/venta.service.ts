import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { param } from 'jquery';
import { Observable, catchError } from 'rxjs';
import { intProductoVenta, intVenta } from './ventaInterface';
import { handleError } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) { }

  agregarVenta(usuario: number, cliente: number, total: number, caja: number, estado: number):Observable<intVenta>{
    return this.http.post<intVenta>('http://localhost:8080/api/ventas/agregar', null, {params:{
      'usuario': usuario,
      'cliente': cliente,
      'total': total,
      'caja': caja,
      'estado': estado
    }}).pipe(catchError(handleError))
  }

  agregarVentaProducto(venta: number, producto: number, cantidad: number, subTotal: number, precio: number):Observable<intProductoVenta>{
    return this.http.post<intProductoVenta>('http://localhost:8080/api/ventas/agregar-vp', null, {params:{
      'venta': venta,
      'producto': producto,
      'cantidad': cantidad,
      'subTotal': subTotal,
      'precio': precio
    }}).pipe(catchError(handleError))
  }

  mostrarVentas():Observable<Array<intVenta>>{
    return this.http.get<Array<intVenta>>('http://localhost:8080/api/ventas/mostrar').pipe(catchError(handleError))
  }

  mostrarVenta(id: number):Observable<intVenta>{
    return this.http.get<intVenta>(`http://localhost:8080/api/ventas/mostrar/${id}`).pipe(catchError(handleError))
  }
}
