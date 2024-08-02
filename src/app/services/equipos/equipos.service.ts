import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { formEquipo, intEquipo } from './equipoInterfaz';
import { handleError } from '../functions';
import { URL } from '../../../assets/const';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private http: HttpClient) { }

  agregar(equipo: formEquipo, cliente:number):Observable<intEquipo>{
    return this.http.post<intEquipo>(`${URL}/api/equipos/agregar`, null, {params:{...equipo, cliente:cliente}}).pipe(catchError(handleError))
  }

  mostrar():Observable<Array<intEquipo>>{
    return this.http.get<Array<intEquipo>>(`${URL}/api/equipos/mostrar`).pipe(catchError(handleError));
  }
}
