import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { intProveedor } from './interfazProveedor';
import { handleError } from '../functions';
import { URL } from '../../../assets/const';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  proveedores(): Observable<Array<intProveedor>>{
    return this.http.get<Array<intProveedor>>(`${URL}/api/proveedor/proveedores`).pipe(catchError(handleError))
  }

  getProveedor(id: number): Observable<intProveedor>{
    return this.http.get<intProveedor>(`${URL}/api/proveedor/getProveedor/${id}`).pipe(catchError(handleError))
  }

  agregarProveedor(nombre: string, tel: string | undefined | null, pagina: string | undefined | null): Observable<intProveedor>{
    let params = {
      nombre: nombre
    } as intProveedor;

    tel? params = {...params, tel: tel}: undefined;
    pagina? params = {...params, pagina: pagina}: undefined;

    return this.http.post<intProveedor>(`${URL}/api/proveedor/agregar`, null, {params:{...params}}).pipe(catchError((err) => handleError(err)))
  }

  editarProveedor(id: number, nombre: string, tel: string | undefined | null, pagina: string | undefined | null): Observable<intProveedor>{
    let params = {
      id: id,
      nombre: nombre
    } as intProveedor;

    tel? params = {...params, tel: tel}: undefined;
    pagina? params = {...params, pagina: pagina}: undefined;

    return this.http.post<intProveedor>(`${URL}/api/proveedor/editar`, null, {params:{...params}}).pipe(catchError(handleError))
  }

  eliminarProveedor(id: number): Observable<any>{
    return this.http.post<any>(`${URL}/api/proveedor/eliminar/${id}`, null).pipe(catchError(handleError))
  }

}
