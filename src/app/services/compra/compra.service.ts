import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intCompra, intProductoCompra } from './compraInterface';
import { handleError } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }

  getCompras():Observable<Array<intCompra>>{
    return this.http.get<Array<intCompra>>('http://localhost:8080/api/compra/compras').pipe(catchError(handleError));
  }

  addCompra(total: number, proveedor: number, isEfectivo: number):Observable<intCompra>{
    return this.http.post<intCompra>('http://localhost:8080/api/compra/agregar', null, {params:{
      total: total,
      proveedor: proveedor,
      isEfectivo: isEfectivo
    }}).pipe(catchError(handleError));
  }

  getCompra(id: number):Observable<intCompra>{
    return this.http.get<intCompra>(`http://localhost:8080/api/compra/compra/${id}`).pipe(catchError(handleError));
  }

  addCompraProducto(producto: number | undefined, compra: number, cantidad: number, precio: number, subTotal: number, nombre: string):Observable<intProductoCompra>{
    return this.http.post<intProductoCompra>('http://localhost:8080/api/compra/agregar-cp', null, {params:{
      producto: producto?producto:1,
      compra: compra,
      cantidad: cantidad,
      precio: precio,
      subTotal: subTotal,
      nombre: nombre
    }}).pipe(catchError(handleError));
  }

  cancelarCompra(id: number):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/api/compra/cancelar/${id}`, null).pipe(catchError(handleError));
  }

  filtrarCompra(search: string):Observable<Array<intCompra>>{
    return this.http.post<Array<intCompra>>("http://localhost:8080/api/compra/filtro", null, {params:{
      search: search
    }}).pipe(catchError(handleError))
  }

  getComprasProductos(id: number):Observable<Array<intProductoCompra>>{
    return this.http.get<Array<intProductoCompra>>(`http://localhost:8080/api/compra/compra-productos/${id}`).pipe(catchError(handleError))
  }
}
