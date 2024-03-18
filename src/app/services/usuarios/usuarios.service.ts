import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intUsuario } from './usuraioInterface';
import { handleError } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

  agregar(usuario: intUsuario):Observable<any>{
    return this.http.post<any>("http://localhost:8080/api/usuarios/addUsuario", usuario).pipe(catchError(handleError))
  }

  editar(usuario: intUsuario):Observable<any>{
    return this.http.post<any>("http://localhost:8080/api/usuarios/editUsuario", usuario).pipe(catchError(handleError))
  }

  eliminar(id: number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/usuarios/dropUser/${id}`).pipe(catchError(handleError));
  }

  mostrar():Observable<Array<intUsuario>>{
    return this.http.get<Array<intUsuario>>("http://localhost:8080/api/usuarios/getAll").pipe(catchError(handleError))
  }
}
