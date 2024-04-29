import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intDiagnostico } from './diagnosticoInterface';
import { handleError } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  constructor(private http: HttpClient) { }

  agregarDiagnostico(diagnostico: intDiagnostico):Observable<intDiagnostico>{
    return this.http.post<intDiagnostico>("http://localhost:8080/api/diagnostico/agregar", null, {params:{
      diagnostico: diagnostico.diagnostico,
      equipo: diagnostico.equipo as number,
      pantalla: diagnostico.pantalla,
      cargador: diagnostico.cargador,
      enciende: diagnostico.enciende,
      bisagras: diagnostico.bisagras,
      ram: diagnostico.ram,
      almacenamiento: diagnostico.almacenamiento
    }}).pipe(catchError(handleError))
  }

  mostrarDiagnosticosEquipo(equipo: number):Observable<Array<intDiagnostico>>{
    return this.http.get<Array<intDiagnostico>>(`http://localhost:8080/api/diagnostico/diagnosticos/${equipo}`).pipe(catchError(handleError));
  }

}
