import { Injectable } from '@angular/core';
import { AuthenticationService } from './../autentica/_services';

import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { IUsuario, IUsuarioContrasena } from '@app/modelo/usuario-interface';


@Injectable({
  providedIn: 'root'
})

export class UsuarioLabService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authenticationService.getToken()!
  });

  headers2: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // getDataPerfil() {
  //  return this.perfilServ;
  // }
  postDataUsuario(dato:any): Observable<any> {
    return this.http.post<IUsuario>(`${environment.apiUrl}/usuario`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

    // PUT
    putDataUsuario(dato:any): Observable<any> {
      console.log('id:', dato._id);
      return this.http.put<IUsuario>(`${environment.apiUrl}/usuario/${dato._id}`, JSON.stringify(dato), { headers: this.headers })
      .pipe(
         retry(1),
        catchError(this.errorHandl)
      );
    }

     // PUT
     putDataUsuarioContrasena(dato:any): Observable<any> {
      console.log('id:', dato._id);
      return this.http.put<IUsuario>(`${environment.apiUrl}/usuarioContrasena/${dato._id}`, JSON.stringify(dato), { headers: this.headers })
      .pipe(
         retry(1),
        catchError(this.errorHandl)
      );
    }

    // PUT
    putDataUsuarioContrasenaReset(dato:any): Observable<any> {
      console.log('id:', dato._id);
      return this.http.put<IUsuarioContrasena>(`${environment.apiUrl}/usuarioContrasenaReset/${dato._id}`, JSON.stringify(dato), { headers: this.headers2 })
      .pipe(
         retry(1),
        catchError(this.errorHandl)
      );
    }

  getDataUsuarioId(Id:string):Observable<any> {
      return this.http.get(`${environment.apiUrl}/usuario/${Id}`, { headers: this.headers })
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
    }

  getDataUsuario(empresaId:string, idCliente: string):Observable<any> {
    console.log('idCliente:',idCliente)
    return this.http.get(`${environment.apiUrl}/usuarioTodo/${empresaId}/${idCliente}`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getDataUsuarioTodo():Observable<any> {
    return this.http.get(`${environment.apiUrl}/usuarioTodo`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  errorHandl(error: HttpErrorResponse) {
    console.log('paso error: ', error.error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log('mio: ', errorMessage);
    Swal.fire(
      'ERROR INESPERADO',
      errorMessage,
     'error'
   );
    return throwError(errorMessage);
 }

}
