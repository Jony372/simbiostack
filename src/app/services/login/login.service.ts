import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginInt } from './loginInterface';
import { Observable, catchError, throwError } from 'rxjs';
import { userInt } from './userInterface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(info:loginInt):Observable<userInt>{
    return this.http.get<userInt>("https://3.141.47.34/api/usuarios/login", {params:{
      user: info.user,
      pass: info.pass
    }}).pipe(catchError(this.handleError));
  }

  private handleError(error:HttpErrorResponse){
    if (error.status === 0) {
      console.error("Se ha producido un error ", error.error);
    }else{
      console.error("El servidor mando el código de error ", error.status, error.error);
    }
    return throwError(()=> new Error("Algo salio mal, por favor vuelve a intentarlo"))}
}
