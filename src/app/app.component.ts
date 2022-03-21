import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './autentica/_services';

import { JwtResponseI } from './autentica/_models';
import { EmpresaService } from './servicios/empresa.service';
import Swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  currentUsuario!: JwtResponseI;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private empresaService: EmpresaService
    ) {
        this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);

    }

/*
    ngAfterViewInit() {
      this.observer
        .observe(['(max-width: 1800px)'])
        .pipe(delay(1))
        .subscribe((res) => {
          if (res.matches) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        });
    }
*/
    ngOnInit() {
    //  if (JSON.parse(localStorage.getItem('currentUsuario')) != null) {
    //   this.currentUsuario.usuarioDato = JSON.parse(localStorage.getItem('currentUsuario')) || [];
    //   console.log('1: ', this.currentUsuario.usuarioDato);

       console.log('paso inicio1')
       if (this.authenticationService.getCurrentUser() != null) {
        this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;

      }

      else
      {
     //   this.router.navigate(['/login']);
      }

    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

}
