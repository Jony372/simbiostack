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
}
