import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { JwtResponseI } from './../../autentica/_models';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    // AUTH_SERVER: string = 'http://localhost:3000';
    authSubject = new BehaviorSubject(false);
    private token!: string;

     private currentUsuarioSubject: BehaviorSubject<JwtResponseI>;
     public currentUsuario: Observable<JwtResponseI>;

    constructor(private http: HttpClient) {
        this.currentUsuarioSubject = new BehaviorSubject<JwtResponseI>(JSON.parse(localStorage.getItem('currentUsuario')!));
        this.currentUsuario = this.currentUsuarioSubject.asObservable();
        console.log('this.currentUsuarioSubject:',this.currentUsuarioSubject);
        console.log('this.currentUsuario:',this.currentUsuario)
    }

     public get currentUsuarioValue(): JwtResponseI {
        return this.currentUsuarioSubject.value;
     }

    login(user: JwtResponseI): Observable<JwtResponseI> {
      return this.http.post<JwtResponseI>(`${environment.apiUrl}/login`,
        user).pipe(tap(
          (res: JwtResponseI) => {
            if (res) {
              // guardar token
              console.log('usuario Local:',res.usuarioDato);
               this.grabaToken(res.usuarioDato.accessToken, res.usuarioDato);
              this.currentUsuarioSubject.next(res);
            }
          })
        );
    }

    private grabaToken(token: string, usuario: any): void {
      console.log('usuario emp:', JSON.stringify(usuario));
      localStorage.setItem('ACCESS_TOKEN', token);
      localStorage.setItem('currentUsuario', JSON.stringify(usuario));
      this.token = token;
    }
    //// login(username: string, password: string) {
      ////  return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
      ////      .pipe(map(user => {
      ////          // iniciar sesión correctamente si hay un token jwt en la respuesta
      ////          if (user && user.token) {
      ////              // almacenar detalles de usuario y token jwt en almacenamiento local
      ////              // para mantener al usuario conectado entre actualizaciones de página
      ////              localStorage.setItem('currentUser', JSON.stringify(user));
      ////              this.currentUserSubject.next(user);
      ////          }

      ////          return user;
      ////      }));
    //// }
    getToken() {
      console.log('ACCESS_TOKEN:',localStorage.getItem('ACCESS_TOKEN'))
      return localStorage.getItem('ACCESS_TOKEN');
    }

    getCurrentUser() {
      const usuario_string = localStorage.getItem('currentUsuario');
      if (usuario_string === null || usuario_string === undefined || usuario_string.trim().length === 0) {
        return null;
      } else {
        const usuario = JSON.parse(usuario_string);
        return usuario;
      }
    }

    logout() {
        // remove user from local storage to log user out
      this.token = '';
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('currentUsuario');
      this.currentUsuarioSubject.next(null as any);
    }
}
