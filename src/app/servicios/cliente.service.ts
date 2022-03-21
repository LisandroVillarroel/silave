import { ICliente } from './../modelo/cliente-interface';
import { Injectable, ɵConsole } from '@angular/core';
import { AuthenticationService } from './../autentica/_services';

import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authenticationService.getToken()!
  });


  // getDataPerfil() {
  //  return this.perfilServ;
  // }

  // POST
  postDataCliente(dato: ICliente): Observable<any> {
    return this.http.post<ICliente>(`${environment.apiUrl}/cliente`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // PUT
  putDataCliente(dato: ICliente): Observable<any> {
    console.log('id:', dato._id);
    return this.http.put<ICliente>(`${environment.apiUrl}/cliente/${dato._id}`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
       retry(1),
      catchError(this.errorHandl)
    );
  }

  // PUT
  deleteDataCliente(dato: ICliente): Observable<any> {
    console.log('id:', dato._id);
    return this.http.delete<ICliente>(`${environment.apiUrl}/cliente/${dato._id}/${dato.usuarioModifica_id}`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getDataCliente(empresaId: string): Observable<any> {

    return this.http.get(`${environment.apiUrl}/clienteTodo/${empresaId}`, { headers: this.headers })
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
