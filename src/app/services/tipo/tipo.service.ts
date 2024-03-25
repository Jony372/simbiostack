import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intTipo } from './interfazTipo';
import { handleError } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  constructor(private http:HttpClient) { }

  mostrar():Observable<Array<intTipo>>{
    return  this.http.get<Array<intTipo>>(`http://localhost:8080/api/tipos-pendientes/mostrar`).pipe(catchError(handleError))
  }
}
