  import { IUsuario, IUsuarioContrasena } from '@app/modelo/usuario-interface';
  import { Component, OnInit } from '@angular/core';
  import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
  import { AuthenticationService } from '@app/autentica/_services';
  import { UsuarioLabService } from '@app/servicios/usuario-lab.service';
  import { JwtResponseI } from '@app/autentica/_models';
  import Swal from 'sweetalert2';
  import { ActivatedRoute, Router } from '@angular/router';
  import {JwtHelperService} from '@auth0/angular-jwt';

  @Component({
    selector: 'app-reset-contrasena',
    templateUrl: './reset-contrasena.component.html',
    styleUrls: ['./reset-contrasena.component.css']
  })
  export class ResetContrasenaComponent implements OnInit {

    form!: UntypedFormGroup;

    datoUsuario!: IUsuarioContrasena;
    currentUsuario!: JwtResponseI;
    mensajeErrorContrasenaActual='';

    helper = new JwtHelperService ();
    validaToken=0;
    constructor(

      private usuarioLabService: UsuarioLabService,
      private authenticationService:AuthenticationService,
      private rutaActiva: ActivatedRoute,
      private router: Router,
    //  private jwtHelper: JwtHelperService
    ) {

    }

    validarQueSeanIguales: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('contrasena');
      const confirmarPassword = control.get('contrasena2');

      return password?.value === confirmarPassword?.value ? null : { 'noSonIguales': true };
    };


    contrasena = new UntypedFormControl('', [Validators.required]);
    contrasena2 = new UntypedFormControl('', [Validators.required]);

    resetContrasena: UntypedFormGroup = new UntypedFormGroup({
      contrasena: this.contrasena,
      contrasena2: this.contrasena2

      // address: this.addressFormControl
    },{validators: [this.validarQueSeanIguales]});

    checarSiSonIguales(): boolean {
      if (this.resetContrasena.hasError('noSonIguales')  &&
      this.resetContrasena.get('contrasena')?.dirty &&  this.resetContrasena.get('contrasena2')?.dirty){
        return true
      }
      return  false;
    }


    getErrorMessage(campo: string){

      if (campo === 'contrasena'){
        return this.contrasena.hasError('required') ? 'Debes ingresar Contraseña'  : '';
      }
      if (campo === 'contrasena2'){
        return this.contrasena2.hasError('required') ? 'Debes ingresar Segúnda Contraseña'  : '';
      }

      return '';
    }

    ngOnInit(): void {
      console.log('token recibido:',this.rutaActiva.snapshot.params['token']);
      if (this.helper.isTokenExpired(this.rutaActiva.snapshot.params['token'])) {
        //console.log('expirado');
        this.validaToken=2;
        // token expired
      } else {
        this.validaToken=1;
        // token valid
      }
    }

    enviar(){




      this.datoUsuario = {
        _id:this.rutaActiva.snapshot.params['id'],
        contrasena: this.resetContrasena.get('contrasena')!.value

      };
      console.log('data_usu:',this.datoUsuario);

      this.usuarioLabService.putDataUsuarioContrasenaReset(this.datoUsuario)
        .subscribe(
          dato => {

            if (dato.codigo === 200) {

              this.mensajeErrorContrasenaActual='';
              Swal.fire({
                title:'Se Actualizó con Éxito',
                icon: 'success',
              confirmButtonText: 'oK',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {

                  this.router.navigate(['/login']);
                }
              })
            }else{

              if (dato.codigo!=500){
                this.mensajeErrorContrasenaActual=dato.mensaje;
                Swal.fire(
                  dato.mensaje,
                  '',
                  'error'
                );
              }
              else{
                Swal.fire(
                  '',
                  'ERROR SISTEMA',
                  'error'
                );
              }
            }
          }
        );

    }





  }
