import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { handleError } from '../functions';
import { pendienteInt } from './pendientesInterface';


@Injectable({
  providedIn: 'root'
})
export class PendientesService {

  constructor(private http: HttpClient ) { }
  
  pendientes():Observable<Array<pendienteInt>>{
    return this.http.get<Array<pendienteInt>>("../../../assets/jsons/pendientes.json").pipe(catchError(handleError));
  }
}
