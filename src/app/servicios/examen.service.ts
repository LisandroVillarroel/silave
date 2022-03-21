import { Injectable, ɵConsole } from '@angular/core';
import { AuthenticationService } from './../autentica/_services';

import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { IExamen } from './../modelo/examen-interface';

@Injectable({
  providedIn: 'root'
})

export class ExamenService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authenticationService.getToken()!
  });


  // getDataPerfil() {
  //  return this.perfilServ;
  // }

  // POST
  postDataExamen(dato:any): Observable<any> {
    return this.http.post<IExamen>(`${environment.apiUrl}/examen`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // PUT
  putDataExamen(dato:any): Observable<any> {
    console.log('id:', dato._id);
    return this.http.put<IExamen>(`${environment.apiUrl}/examen/${dato._id}`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
       retry(1),
      catchError(this.errorHandl)
    );
  }

  // PUT
  deleteDataExamen(dato:any): Observable<any> {
    console.log('id:', dato._id);
    return this.http.delete<IExamen>(`${environment.apiUrl}/examen/${dato._id}/${dato.usuarioModifica_id}`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getDataExamen(empresaId:string):Observable<any> {
    return this.http.get(`${environment.apiUrl}/examenTodo/${empresaId}`, { headers: this.headers })
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
