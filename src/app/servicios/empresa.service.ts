import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/autentica/_services';
import { IEmpresa } from '@app/modelo/empresa-interface';
import { environment } from '@environments/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authenticationService.getToken()!
  });


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

    console.log('dirección:',`${environment.apiUrl}/empresaTodo`,this.headers )
    return this.http.get(`${environment.apiUrl}/empresaTodo/`, { headers: this.headers })
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


