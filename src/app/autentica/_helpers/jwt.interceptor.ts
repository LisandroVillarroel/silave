import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './../../autentica/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUsuario = this.authenticationService.currentUsuarioValue;
        if (currentUsuario && currentUsuario.usuarioDato.accessToken) {
            request = request.clone({
                setHeaders: {Authorization: `Bearer ${currentUsuario.usuarioDato.accessToken}`}
            });
        }
        return next.handle(request);
    }
}
