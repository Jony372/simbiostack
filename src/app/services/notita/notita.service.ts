import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { intNotita } from './notitaInterface';
import { Observable, catchError } from 'rxjs';
import { error } from 'console';
import { handleError } from '../functions';
import { URL } from '../../../assets/const';

@Injectable({
  providedIn: 'root'
})
export class NotitaService {

  constructor(private http: HttpClient) { }

  agregarNotita():Observable<intNotita>{
    return this.http.post<intNotita>(`${URL}/api/notitas/agregar`, null, {params: {
      descripcion: ''
    }}).pipe(catchError(error => handleError(error)))
  }

  editarNotita(id: number, descripcion: string):Observable<intNotita>{
    return this.http.post<intNotita>(`${URL}/api/notitas/editar/${id}`, null, {params: {
      descripcion: descripcion
    }}).pipe(catchError(error => handleError(error)))
  }

  mostrarNotitas():Observable<Array<intNotita>>{
    return this.http.get<Array<intNotita>>(`${URL}/api/notitas/mostrar`).pipe(catchError(error => handleError(error)))
  }

  eliminarNotita(id: number):Observable<any>{
    return this.http.post<any>(`${URL}/api/notitas/eliminar/${id}`, null).pipe(catchError(error => handleError(error)))
  }
}
