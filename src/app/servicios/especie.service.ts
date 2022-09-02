import { Injectable, ɵConsole } from '@angular/core';
import { AuthenticationService } from './../autentica/_services';

import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { IEspecie } from './../modelo/especie-interface';

@Injectable({
  providedIn: 'root'
})

export class EspecieService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authenticationService.getToken()!
  });


  // getDataPerfil() {
  //  return this.perfilServ;
  // }

  // POST
  postDataEspecie(dato:any): Observable<any> {
    return this.http.post<IEspecie>(`${environment.apiUrl}/especie`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // PUT
  putDataEspecie(dato:any,nombreEspecieAnterior:string): Observable<any> {
    console.log('id:', dato._id);
    return this.http.put<IEspecie>(`${environment.apiUrl}/especie/${dato._id}/${nombreEspecieAnterior}`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
       retry(1),
      catchError(this.errorHandl)
    );
  }


  deleteDataEspecie(dato:any): Observable<any> {
    console.log('id:', dato._id);
    return this.http.delete<IEspecie>(`${environment.apiUrl}/especie/${dato._id}/${dato.usuarioModifica_id}`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getDataEspecieTodo(empresaId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/especieTodo/${empresaId}`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getDataEmpresaTodo():Observable<any> {

    console.log('dirección:',`${environment.apiUrl}/empresaTodo`,this.headers )
    return this.http.get(`${environment.apiUrl}/empresaTodo/`, { headers: this.headers })
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
