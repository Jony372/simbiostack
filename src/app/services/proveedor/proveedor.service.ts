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

  agregarProveedor(nombre: string, tel: string | undefined | null, pagina: string | undefined | null): Observable<intProveedor>{
    let params = {
      nombre: nombre
    } as intProveedor;

    tel? params = {...params, tel: tel}: undefined;
    pagina? params = {...params, pagina: pagina}: undefined;

    return this.http.post<intProveedor>('http://localhost:8080/api/proveedor/agregar', null, {params:{...params}}).pipe(catchError((err) => handleError(err)))
  }

  editarProveedor(id: number, nombre: string, tel: string | undefined | null, pagina: string | undefined | null): Observable<intProveedor>{
    let params = {
      id: id,
      nombre: nombre
    } as intProveedor;

    tel? params = {...params, tel: tel}: undefined;
    pagina? params = {...params, pagina: pagina}: undefined;

    return this.http.post<intProveedor>('http://localhost:8080/api/proveedor/editar', null, {params:{...params}}).pipe(catchError(handleError))
  }

  eliminarProveedor(id: number): Observable<any>{
    return this.http.post<any>(`http://localhost:8080/api/proveedor/eliminar/${id}`, null).pipe(catchError(handleError))
  }

}
