import { IEmpresa } from './../modelo/empresa-interface';
import { Injectable, ɵConsole } from '@angular/core';
import { AuthenticationService } from './../autentica/_services';

import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EmpresaService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authenticationService.getToken()!
  });


  // getDataPerfil() {
  //  return this.perfilServ;
  // }

  // POST
  postDataEmpresa(dato:any): Observable<any> {
    return this.http.post<IEmpresa>(`${environment.apiUrl}/empresa`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // PUT
  putDataEmpresa(dato:any): Observable<any> {
    console.log('id:', dato._id);
    return this.http.put<IEmpresa>(`${environment.apiUrl}/empresa/${dato._id}`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // PUT
  deleteDataEmpresa(dato:any): Observable<any> {
    console.log('id:', dato._id);
    return this.http.delete<IEmpresa>(`${environment.apiUrl}/empresa/${dato._id}/${dato.usuarioModifica_id}`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getDataEmpresaTodo():Observable<any> {

    return this.http.get(`${environment.apiUrl}/empresaTodo`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getDataEmpresa(id:string):Observable<any> {
    console.log('service empresa:',id);
    return this.http.get(`${environment.apiUrl}/empresa/${id}`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  errorHandl(error:any) {
    console.log('paso error: ', error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }




}
