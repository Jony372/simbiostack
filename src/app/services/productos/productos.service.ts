import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { intProducto, intRegProducto } from './productoInterface';
import { Observable, catchError } from 'rxjs';
import { handleError } from '../functions';
import { URL } from '../../../assets/const';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }
  
  agregarProducto(precio: number, cantidad: number, codigoBarra:string, nombre: string, categoria: number, costo: number, utilidad: number): Observable<intProducto>{
    return this.http.post<intProducto>(`${URL}/api/productos/addProducto`, null, {params:{
      precio: precio,
      cantidad: cantidad,
      codigoBarra: codigoBarra,
      nombre: nombre,
      categoria: categoria,
      costo: costo,
      utilidad: utilidad
    }}).pipe(catchError(handleError))
  }

  editarProducto(id: number, precio: number, cantidad: number, codigoBarra:string, nombre: string, categoria: number, costo: number, utilidad: number):Observable<intProducto>{
    return this.http.post<intProducto>(`${URL}/api/productos/editar`,null, {params:{
      id: id,
      precio: precio,
      cantidad: cantidad,
      codigoBarra: codigoBarra,
      nombre: nombre,
      categoria: categoria,
      costo: costo,
      utilidad: utilidad
    }}).pipe(catchError(handleError))
  }

  obtenerProductos():Observable<Array<intProducto>>{
    return this.http.get<Array<intProducto>>(`${URL}/api/productos/show`).pipe(catchError(handleError))
  }

  obtenerProducto(id:number):Observable<intProducto>{
    return this.http.get<intProducto>(`${URL}/api/productos/get/${id}`).pipe(catchError(handleError))
  }

  eliminarProducto(id: number):Observable<any>{
    return this.http.get<any>(`${URL}/api/productos/delete/${id}`).pipe(catchError(handleError))
  }

  bajoStock():Observable<Array<intProducto>>{
    return this.http.get<Array<intProducto>>(`${URL}/api/productos/bajoStock`).pipe(catchError(handleError))
  }

  masVendidos(periodo: number):Observable<Array<any>>{
    return this.http.get<Array<any>>(`${URL}/api/productos/mas-vendidos`, {params:{
      periodo: periodo
    }}).pipe(catchError(handleError))
  }
}
