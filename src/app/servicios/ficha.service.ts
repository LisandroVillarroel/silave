import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './../autentica/_services';
import { IFicha } from './../modelo/ficha-interface';
import { environment } from './../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authenticationService.getToken()!
  });

   header = {
    headers: new HttpHeaders()
      .set('Authorization', this.authenticationService.getToken()!)
  }


  // getDataPerfil() {
  //  return this.perfilServ;
  // }

  // POST
    postDataFicha(dato:IFicha,numeroFichaCorrelativo:number): Observable<any> {
    console.log('envia agregar ficha:', dato);
    return this.http.post<IFicha>(`${environment.apiUrl}/ficha/${numeroFichaCorrelativo}`, JSON.stringify(dato),{ headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // PUT
  putDataFicha(dato:any): Observable<any> {
    console.log('id:', dato._id);
    return this.http.put<IFicha>(`${environment.apiUrl}/ficha/${dato._id}`, JSON.stringify(dato), { headers: this.headers })
    .pipe(
       retry(1),
      catchError(this.errorHandl)
    );
  }

  // PUT
  deleteDataFicha(dato:any): Observable<any> {
    console.log('id:', dato._id);
    return this.http.delete<IFicha>(`${environment.apiUrl}/ficha/${dato._id}/${dato.usuarioModifica_id}`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getDataFicha(empresaId:string,estadoFicha:string,usuario:string,tipoPermiso:string):Observable<any> {
    return this.http.get(`${environment.apiUrl}/fichaTodo/${empresaId}/${estadoFicha}/${usuario}/${tipoPermiso}`, { headers: this.headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }



  //upload(file:any,nombreArchivo: string,empresa_Id:string,directorio:string,nombreExamen:string,numFicha:string,ficha_Id:string):Observable<any> {
  upload(file:any,nombreArchivo: string,ficha_Id:string):Observable<any> {
    console.log('nombre Archivo:',nombreArchivo);
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, nombreArchivo);

    //return this.http.post(`${environment.apiUrl}/fichaSubeArchivo/${empresa_Id}/${directorio}/${nombreExamen}/${numFicha}/${ficha_Id}`, formData, this.header)
    return this.http.post(`${environment.apiUrl}/fichaSubeArchivo/${ficha_Id}`, formData, this.header)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }




  postDownLoadFile(file:string){
    var body = {filename:file};
    console.log('nombre:',body);
    return this.http.post(`${environment.apiUrl}/fichaDescargaArchivo`,body,{
        responseType : 'blob',
        headers:new HttpHeaders().append('Content-Type','application/json')
    });
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
