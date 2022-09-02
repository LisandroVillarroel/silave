import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/autentica/_services';
import { IValidador } from '@app/modelo/validador-interface';
import { environment } from '@environments/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authenticationService.getToken()!
  });


  // POST
  postDataValidador(dato:any): Observable<any> {
    return this.http.post<IValidador>(`${environment.apiUrl}/validador`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // PUT
  putDataValidador(dato:any): Observable<any> {
    console.log('id:', dato._id);
    return this.http.put<IValidador>(`${environment.apiUrl}/validador/${dato._id}`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // PUT
  deleteDataValidador(dato:any): Observable<any> {
    console.log('id:', dato._id);
    return this.http.delete<IValidador>(`${environment.apiUrl}/validador/${dato._id}/${dato.usuarioModifica_id}`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getDataValidadorTodo(empresa_Id:string):Observable<any> {

    return this.http.get(`${environment.apiUrl}/validadorTodo/${empresa_Id}`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getDataValidador(id:string):Observable<any> {
    console.log('service empresa:',id);
    return this.http.get(`${environment.apiUrl}/validador/${id}`, { headers: this.headers })
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


