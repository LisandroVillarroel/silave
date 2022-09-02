import { Injectable, ɵConsole } from '@angular/core';
import { AuthenticationService } from './../autentica/_services';

import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { IRaza } from './../modelo/raza-interface';

@Injectable({
  providedIn: 'root'
})

export class RazaService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authenticationService.getToken()!
  });


  // getDataPerfil() {
  //  return this.perfilServ;
  // }

  // POST
  postDataRaza(dato:any): Observable<any> {
    return this.http.post<IRaza>(`${environment.apiUrl}/raza`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

   // POST
   postDataRazaMasiva(dato:IRaza[]): Observable<any> {
    return this.http.post<IRaza[]>(`${environment.apiUrl}/razaMasiva`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // PUT
  putDataRaza(dato:any): Observable<any> {
    console.log('id:', dato._id);
    return this.http.put<IRaza>(`${environment.apiUrl}/raza/${dato._id}`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
       retry(1),
      catchError(this.errorHandl)
    );
  }


  deleteDataRaza(dato:any): Observable<any> {
    console.log('id:', dato._id);
    return this.http.delete<IRaza>(`${environment.apiUrl}/raza/${dato._id}/${dato.usuarioModifica_id}`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getDataRazaTodo(empresaId:string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/razaTodo/${empresaId}`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getDataRazaTodoEspecie(empresaId:string,nombreEspecie:string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/razaTodo/${empresaId}/${nombreEspecie}`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  errorHandl(error: HttpErrorResponse) {
    console.log('paso error: ', error);
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
