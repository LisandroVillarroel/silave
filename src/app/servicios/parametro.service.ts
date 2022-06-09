import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/autentica/_services';
import { IParametro } from '@app/modelo/parametro-interface';
import { environment } from '@environments/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authenticationService.getToken()!
  });


  // getDataPerfil() {
  //  return this.perfilServ;
  // }

  // POST
  postDataParametro(dato:any): Observable<any> {
    return this.http.post<IParametro>(`${environment.apiUrl}/parametro`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // PUT
  putDataParametro(dato:any): Observable<any> {
    console.log('id:', dato._id);
    return this.http.put<IParametro>(`${environment.apiUrl}/parametro/${dato._id}`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
       retry(1),
      catchError(this.errorHandl)
    );
  }


  deleteDataParametro(dato:any): Observable<any> {
    console.log('id:', dato._id);
    return this.http.delete<IParametro>(`${environment.apiUrl}/parametro/${dato._id}/${dato.usuarioModifica_id}`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getDataParametro(empresaId:string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/parametroTodo/${empresaId}`, { headers: this.headers })
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
