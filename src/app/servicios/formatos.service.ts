import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './../autentica/_services';
import { IFormatos } from './../modelo/formatos-interface';
import { environment } from './../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FormatosService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authenticationService.getToken()!
  });


  // getDataPerfil() {
  //  return this.perfilServ;
  // }

  // POST
  postDataFormatos(dato:any): Observable<any> {
    return this.http.post<IFormatos>(`${environment.apiUrl}/formatos`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // PUT
  putDataFormatos(dato:any): Observable<any> {
    console.log('id:', dato._id);
    return this.http.put<IFormatos>(`${environment.apiUrl}/formatos/${dato._id}`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
       retry(1),
      catchError(this.errorHandl)
    );
  }

  // PUT
  deleteDataFormatos(dato:any): Observable<any> {
    console.log('id:', dato._id);
    return this.http.delete<IFormatos>(`${environment.apiUrl}/formatos/${dato._id}/${dato.usuarioModifica_id}`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getDataFormatos():Observable<any> {
    return this.http.get(`${environment.apiUrl}/formatosTodo`, { headers: this.headers })
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
