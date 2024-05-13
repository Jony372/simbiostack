import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { intProducto, intRegProducto } from './productoInterface';
import { Observable, catchError } from 'rxjs';
import { handleError } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }
  
  agregarProducto(precio: number, cantidad: number, codigoBarra:string, nombre: string, categoria: number, costo: number, utilidad: number): Observable<intProducto>{
    return this.http.post<intProducto>("http://localhost:8080/api/productos/addProducto", null, {params:{
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
    return this.http.post<intProducto>("http://localhost:8080/api/productos/editar",null, {params:{
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
    return this.http.get<Array<intProducto>>("http://localhost:8080/api/productos/show").pipe(catchError(handleError))
  }

  obtenerProducto(id:number):Observable<intProducto>{
    return this.http.get<intProducto>(`http://localhost:8080/api/productos/get/${id}`).pipe(catchError(handleError))
  }

  eliminarProducto(id: number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/productos/delete/${id}`).pipe(catchError(handleError))
  }

  bajoStock():Observable<Array<intProducto>>{
    return this.http.get<Array<intProducto>>("http://localhost:8080/api/productos/bajoStock").pipe(catchError(handleError))
  }

  masVendidos(periodo: number):Observable<Array<any>>{
    return this.http.get<Array<any>>("http://localhost:8080/api/productos/mas-vendidos", {params:{
      periodo: periodo
    }}).pipe(catchError(handleError))
  }
}
