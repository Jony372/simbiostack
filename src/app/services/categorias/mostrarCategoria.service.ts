import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { handleError } from '../functions';
import { intCategoria } from './categoriaInterfaz';
import { URL } from '../../../assets/const';

@Injectable({
  providedIn: 'root'
})
export class mostrarCategoria {

  constructor(private http: HttpClient) { }

  categorias():Observable<Array<intCategoria>>{
    return this.http.get<Array<intCategoria>>(`${URL}/api/categorias/show`).pipe(catchError(handleError));
  }

  editarCategoria(id: number, nombre: string, stock: number):Observable<intCategoria>{
    return this.http.post<intCategoria>(`${URL}/api/categorias/editar/${id}`, null, {params:{
      nombre: nombre,
      stock: stock
    }}).pipe(catchError(handleError));
  }

  agregarCategoria(nombre: string, stock: number):Observable<intCategoria>{
    return this.http.post<intCategoria>(`${URL}/api/categorias/addCategoria`, null, {params:{
      nombre: nombre,
      stock: stock
    }}).pipe(catchError(handleError));
  }

  eliminarCategoria(id: number):Observable<any>{
    return this.http.post<any>(`${URL}/api/categorias/delete/${id}`, null).pipe(catchError(handleError));
  }

  bajoStock():Observable<Array<intCategoria>>{
    return this.http.get<Array<intCategoria>>(`${URL}/api/categorias/bajoStock`).pipe(catchError(handleError))
  }
}
