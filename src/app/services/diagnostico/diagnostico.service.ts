import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intDiagnostico } from './diagnosticoInterface';
import { handleError } from '../functions';
import { URL } from '../../../assets/const';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  constructor(private http: HttpClient) { }

  agregarDiagnostico(diagnostico: intDiagnostico, equipo: number):Observable<intDiagnostico>{
    return this.http.post<intDiagnostico>(`${URL}/api/diagnostico/agregar`, null, {params:{
      ...diagnostico,
      equipo: equipo
    }}).pipe(catchError(handleError))
  }

  mostrarDiagnosticosEquipo(equipo: number):Observable<Array<intDiagnostico>>{
    return this.http.get<Array<intDiagnostico>>(`${URL}/api/diagnostico/diagnosticos/${equipo}`).pipe(catchError(handleError));
  }

}
