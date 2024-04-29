import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intProveedor } from './interfazProveedor';
import { handleError } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  proveedores(): Observable<Array<intProveedor>>{
    return this.http.get<Array<intProveedor>>('http://localhost:8080/api/proveedor/proveedores').pipe(catchError(handleError))
  }

  getProveedor(id: number): Observable<intProveedor>{
    return this.http.get<intProveedor>(`http://localhost:8080/api/proveedor/getProveedor/${id}`).pipe(catchError(handleError))
  }

  agregarProveedor(nombre: string, tel: string, pagina: string): Observable<intProveedor>{
    return this.http.post<intProveedor>('http://localhost:8080/api/proveedor/agregar', null, {params:{
      nombre: nombre,
      tel: tel,
      pagina: pagina
    }}).pipe(catchError(handleError))
  }

  editarProveedor(id: number, nombre: string, tel: string, pagina: string): Observable<intProveedor>{
    return this.http.put<intProveedor>('http://localhost:8080/api/proveedor/editar', null, {params:{
      id: id,
      nombre: nombre,
      tel: tel,
      pagina: pagina
    }}).pipe(catchError(handleError))
  }

  eliminarProveedor(id: number): Observable<any>{
    return this.http.post<any>(`http://localhost:8080/api/proveedor/eliminar/${id}`, null).pipe(catchError(handleError))
  }

}
