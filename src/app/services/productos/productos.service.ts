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
  
  agregarProducto(body: intRegProducto): Observable<intProducto>{
    return this.http.post<intProducto>("http://localhost:8080/api/productos/addProducto", body).pipe(catchError(handleError))
  }

  editarProducto(producto:intRegProducto):Observable<string>{
    return this.http.post<string>("http://localhost:8080/api/productos/editar",producto).pipe(catchError(handleError))
  }

  obtenerProductos():Observable<Array<intProducto>>{
    return this.http.get<Array<intProducto>>("http://localhost:8080/api/productos/show").pipe(catchError(handleError))
  }

  obtenerProducto(id:number):Observable<intProducto>{
    return this.http.get<intProducto>(`http://localhost:8080/api/productos/get/${id}`).pipe(catchError(handleError))
  }

  eliminarProducto(id: number):Observable<string>{
    return this.http.get<string>(`http://localhost:8080/api/productos/delete/${id}`).pipe(catchError(handleError))
  }
}
