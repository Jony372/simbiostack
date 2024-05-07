import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { handleError } from '../functions';
import { intCategoria } from './categoriaInterfaz';

@Injectable({
  providedIn: 'root'
})
export class mostrarCategoria {

  constructor(private http: HttpClient) { }

  categorias():Observable<Array<intCategoria>>{
    return this.http.get<Array<intCategoria>>("http://localhost:8080/api/categorias/show").pipe(catchError(handleError));
  }

  editarCategoria(id: number, nombre: string, stock: number):Observable<intCategoria>{
    return this.http.post<intCategoria>(`http://localhost:8080/api/categorias/editar/${id}}`, null, {params:{
      nombre: nombre,
      stock: stock
    }}).pipe(catchError(handleError));
  }

  agregarCategoria(nombre: string, stock: number):Observable<intCategoria>{
    return this.http.post<intCategoria>(`http://localhost:8080/api/categorias/addCategoria`, null, {params:{
      nombre: nombre,
      stock: stock
    }}).pipe(catchError(handleError));
  }

  eliminarCategoria(id: number):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/api/categorias/delete/${id}`, null).pipe(catchError(handleError));
  }

  bajoStock():Observable<Array<intCategoria>>{
    return this.http.get<Array<intCategoria>>("http://localhost:8080/api/categorias/bajoStock").pipe(catchError(handleError))
  }
}
