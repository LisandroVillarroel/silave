import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { JwtResponseI } from './../autentica/_models';
import { AuthenticationService } from './../autentica/_services';

@Component({
templateUrl: './home.component.html',})
export class HomeComponent implements OnInit {
    currentUsuario!: JwtResponseI;
    currentUsuarioSubscription!: Subscription;
    usuarios: JwtResponseI[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        //// this.currentUsuarioSubscription = this.authenticationService.currentUsuario.subscribe(user => {
        ////    this.currentUsuario = user;
        //// });
        console.log('paso1: ', this.authenticationService.currentUsuarioValue);
        if (this.authenticationService.currentUsuarioValue) {
          console.log('paso2');
          this.router.navigate(['/']);
      }
    }

    ngOnInit() {
      ////  this.loadAllUsers();
    }

    deleteUser(id:string){
      console.log('');
    }
    //// ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
    ////    this.currentUsuarioSubscription.unsubscribe();
    //// }

}
