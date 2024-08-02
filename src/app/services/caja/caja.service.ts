import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intCaja } from './cajaInterfaz';
import { handleError } from '../functions';
import { URL } from '../../../assets/const';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(private http: HttpClient) { }

  abrirCaja(dinInicial: number):Observable<intCaja> {
    return this.http.post<intCaja>(`${URL}/api/caja/agregar`, null, {params: {dinInicial: dinInicial}}).pipe(catchError(error => handleError(error)));
  }

  cajaActual():Observable<intCaja> {
    return this.http.get<intCaja>(`${URL}/api/caja/caja-actual`).pipe(catchError(error => handleError(error)));
  }
}
