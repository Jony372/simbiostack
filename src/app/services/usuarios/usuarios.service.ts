import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intUsuario } from './usuraioInterface';
import { handleError } from '../functions';
import { intCliente } from '../clientes/clienteInterfaz';
import { URL } from '../../../assets/const';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

  agregar(nombre: string, tel: string, user: string, pass: string, isAdmin: number):Observable<intUsuario>{
    return this.http.post<intUsuario>(`${URL}/api/usuarios/addUsuario`,null, {params:{
      'nombre': nombre,
      'tel': tel,
      'user': user,
      'pass': pass,
      'isAdmin': isAdmin
    }}).pipe(catchError(handleError))
  }

  editar(id: number, nombre: string, tel: string, user: string, pass: string, isAdmin: number):Observable<any>{
    return this.http.post<any>(`${URL}/api/usuarios/editUsuario`, null, {params:{
      id: id,
      nombre: nombre,
      tel: tel,
      user: user,
      pass: pass,
      isAdmin: isAdmin
    }}).pipe(catchError(handleError))
  }

  eliminar(id: number):Observable<any>{
    return this.http.get<any>(`${URL}/api/usuarios/dropUser/${id}`).pipe(catchError(handleError));
  }

  mostrar():Observable<Array<intUsuario>>{
    return this.http.get<Array<intUsuario>>(`${URL}/api/usuarios/getAll`).pipe(catchError(handleError))
  }
}
