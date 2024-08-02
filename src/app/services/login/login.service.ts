import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginInt } from './loginInterface';
import { Observable, catchError, throwError } from 'rxjs';
import { userInt } from './userInterface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Toast, URL } from '../../../assets/const';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  login(info:loginInt):Observable<userInt>{
    return this.http.get<userInt>(`${URL}/api/usuarios/login`, {params:{
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
    return throwError(()=> new Error("Algo salio mal, por favor vuelve a intentarlo: "+error.error))
  }

  cerrarSesion(){
    // this.cookieService.delete('user');
    this.cookieService.delete('user', '/');
    this.router.navigateByUrl('/login')
    Toast.fire({
      icon: 'success',
      title: 'Sesión cerrada'
    })
  }

  guardarSesion(usuario: userInt){
    this.cookieService.set('user', JSON.stringify(usuario), undefined, '/')
  }

  checkSesion():boolean{
    return this.cookieService.check('user')
  }

  getUsuario():userInt{
    return JSON.parse(this.cookieService.get('user'))
  }

  isAdmin():boolean{
    return this.getUsuario().isAdmin === 1;
  }
}