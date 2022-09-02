import { IUsuario, IUsuarioContrasena } from '@app/modelo/usuario-interface';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/autentica/_services';
import { UsuarioLabService } from '@app/servicios/usuario-lab.service';
import { JwtResponseI } from '@app/autentica/_models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styleUrls: ['./cambio-contrasena.component.css']
})
export class CambioContrasenaComponent implements OnInit {

  form!: FormGroup;

  datoUsuario!: IUsuarioContrasena;
  currentUsuario!: JwtResponseI;
  existeContrasenaActual=true;
  mensajeErrorContrasenaActual='';

  constructor(

    private usuarioLabService: UsuarioLabService,
    private authenticationService:AuthenticationService,
  ) {
    this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);

  }



  validarQueSeanIguales: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('contrasena');
    const confirmarPassword = control.get('contrasena2');

    return password?.value === confirmarPassword?.value ? null : { 'noSonIguales': true };
  };


  contrasenaActual = new FormControl('', [Validators.required]);
  contrasena = new FormControl('', [Validators.required]);
  contrasena2 = new FormControl('', [Validators.required]);

  modificaContrasena: FormGroup = new FormGroup({
    contrasenaActual: this.contrasenaActual,
    contrasena: this.contrasena,
    contrasena2: this.contrasena2

    // address: this.addressFormControl
  },{validators: [this.validarQueSeanIguales]});

  checarSiSonIguales(): boolean {
    if (this.modificaContrasena.hasError('noSonIguales')  &&
    this.modificaContrasena.get('contrasena')?.dirty &&  this.modificaContrasena.get('contrasena2')?.dirty){
      return true
    }
    return  false;
  }


  getErrorMessage(campo: string){
    if (campo === 'contrasenaActual'){
      return this.contrasenaActual.hasError('required') ? 'Debes ingresar Contraseña Actual': '';
    }
    if (campo === 'contrasena'){
      return this.contrasena.hasError('required') ? 'Debes ingresar Contraseña'  : '';
    }
    if (campo === 'contrasena2'){
      return this.contrasena2.hasError('required') ? 'Debes ingresar Segúnda Contraseña'  : '';
    }

    return '';
  }

  ngOnInit(): void {
  }

  enviar(){




    this.datoUsuario = {
      _id:this.currentUsuario.usuarioDato._id,
      contrasenaActual: this.modificaContrasena.get('contrasenaActual')!.value,
      contrasena: this.modificaContrasena.get('contrasena')!.value,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id

    };

    this.usuarioLabService.putDataUsuarioContrasena(this.datoUsuario)
      .subscribe(
        dato => {

          if (dato.codigo === 200) {
            this.existeContrasenaActual=true;
            this.mensajeErrorContrasenaActual='';
              Swal.fire(
              'Se Actualizó con Éxito',
              '',
              'success'
            ); // ,
          }else{

            if (dato.codigo!=500){
              this.mensajeErrorContrasenaActual=dato.mensaje;
              this.existeContrasenaActual=false;
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
