import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

import { AlertService, AuthenticationService } from '../../autentica/_services';
import Swal from 'sweetalert2';
import { JwtResponseI } from '../_models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 // loginForm: FormGroup;
 form!: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;

  currentUsuario!: JwtResponseI;

  constructor(
    //  private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService
  ) {
      // redirect to home if already logged in
      console.log('autentica: ',this.authenticationService.currentUsuarioValue);
      if (this.authenticationService.currentUsuarioValue) {
          this.router.navigate(['/']);
      }
  }

  usuario = new UntypedFormControl('', [Validators.required]);
  contrasena = new UntypedFormControl('', [Validators.required]);

  loginForm: UntypedFormGroup = new UntypedFormGroup({
      usuario: this.usuario,
      contrasena: this.contrasena
  });

  ngOnInit() {
    console.log('login: ');


      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  // convenience getter for easy access to form fields
  //get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      console.log('login: ', this.returnUrl);


      this.loginForm.get('usuario')!.setValue(this.loginForm.get('usuario')!.value.toUpperCase());


      this.loading = true;
      this.authenticationService.login(this.loginForm.value)
          .pipe(first())
          .subscribe(
              data => {
                console.log('paso1111');
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                console.log('paso2222', error);
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

  restContrasena(){
    Swal.fire({
      title: 'Ingrese Usuario',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`${environment.apiUrl}/resetContrasena/${login}/${environment.urlFront}` )
          .then(response => {
            console.log('response:',response)
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log('result confirm:',result)
      if (result.isConfirmed) {
        if (result.value.codigo===200){
          Swal.fire({
            html:"<img src='./../../../assets/imagenes/email.jpg' style='width:150px;'>",
            title: `Se envió contraseña al Email:${result.value.data}`,
          // imageUrl: result.value.avatar_url
          })
        }else{
          Swal.fire(
          'Usuario no encontrado',
          '',
          'error'
          // imageUrl: result.value.avatar_url
          )
        }
      }
    })
  }

}
