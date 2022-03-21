  import { Component, OnInit, Inject } from '@angular/core';
  import { FormGroup, FormControl, Validators } from '@angular/forms';
  import { formatRut, RutFormat, validateRut } from "@fdograph/rut-utilities";

  import { IUsuario } from '@app/modelo/usuario-interface';
  import { UsuarioLabService } from '@app/servicios/usuario-lab.service';


  import Swal from 'sweetalert2';
import { AuthenticationService } from '@app/autentica/_services';
import { JwtResponseI } from '@app/autentica/_models';

  @Component({
    selector: 'app-actualiza-datos',
    templateUrl: './actualiza-datos.component.html',
    styleUrls: ['./actualiza-datos.component.css']
  })
  export class ActualizaDatosComponent implements OnInit {

    form!: FormGroup;

    currentUsuario!: JwtResponseI;

    datoUsuario!: IUsuario;

    constructor(private  usuarioLabService: UsuarioLabService,
                private authenticationService:AuthenticationService,
                ) {
                  this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
                  if (this.authenticationService.getCurrentUser() != null) {
                        this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
                  }
                  this.getListUsuario();
    }

    rutUsuario = new FormControl('', [Validators.required, this.validaRut]);

    nombres = new FormControl('', [Validators.required]);
    apellidoPaterno = new FormControl('', [Validators.required]);
    apellidoMaterno = new FormControl('', [Validators.required]);
    email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);
    telefono = new FormControl('', [Validators.required]);
    direccion = new FormControl('', [Validators.required]);

    modificaUsuario: FormGroup = new FormGroup({

      rutUsuario: this.rutUsuario,
      nombres: this.nombres,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      email: this.email,
      telefono: this.telefono,
      direccion: this.direccion,

      // address: this.addressFormControl
    });

    getErrorMessage(campo: string){

      if (campo === 'rutUsuario'){
          return this.rutUsuario.hasError('required') ? 'Debes ingresar Rut' :
          this.rutUsuario.hasError('rutInvalido') ? 'Rut Inválido' : '';
      }
      if (campo === 'nombres'){
          return this.nombres.hasError('required') ? 'Debes ingresar Nombres'  : '';
      }
      if (campo === 'apellidoPaterno'){
          return this.apellidoPaterno.hasError('required') ? 'Debes ingresar Apellido Paterno' : '';
      }
      if (campo === 'apellidoMaterno'){
        return this.apellidoMaterno.hasError('required') ? 'Debes ingresar Apellido Materno' : '';
    }
      if (campo === 'direccion'){
          return this.direccion.hasError('required') ? 'Debes ingresar Dirección' : '';
      }
      if (campo === 'telefono'){
        return this.telefono.hasError('required') ? 'Debes ingresar Teléfono' : '';
      }
      if (campo === 'email'){
        return this.email.hasError('required') ? 'Debes ingresar Email' : '';
      }
      return '';
    }

    ngOnInit() {
    }

    getListUsuario(): void {
      console.log('pasa ficha 2');
      this.usuarioLabService
        .getDataUsuarioId(this.currentUsuario.usuarioDato._id)
        .subscribe(res => {
          console.log('usuario: ', res.data);
          this.modificaUsuario.get('rutUsuario')!.setValue(res.data[0].rutUsuario);
          this.modificaUsuario.get('nombres')!.setValue(res.data[0].nombres);
          this.modificaUsuario.get('apellidoPaterno')!.setValue(res.data[0].apellidoPaterno);
          this.modificaUsuario.get('apellidoMaterno')!.setValue(res.data[0].apellidoMaterno);
          this.modificaUsuario.get('email')!.setValue(res.data[0].email);
          this.modificaUsuario.get('telefono')!.setValue(res.data[0].telefono);
          this.modificaUsuario.get('direccion')!.setValue(res.data[0].direccion);
        },
        // console.log('yo:', res as PerfilI[]),
        error => {
          console.log('error carga:', error);
          Swal.fire(
            'ERROR INESPERADO',
            error,
           'error'
         );
        }
      ); // (this.dataSource.data = res as PerfilI[])
    }


    enviar() {
      this.datoUsuario = {
        _id:this.currentUsuario.usuarioDato._id,
        rutUsuario: this.modificaUsuario.get('rutUsuario')!.value.toUpperCase(),
        nombres: this.modificaUsuario.get('nombres')!.value.toUpperCase(),
        apellidoPaterno: this.modificaUsuario.get('apellidoPaterno')!.value.toUpperCase(),
        apellidoMaterno: this.modificaUsuario.get('apellidoMaterno')!.value.toUpperCase(),
        telefono: this.modificaUsuario.get('telefono')!.value,
        email: this.modificaUsuario.get('email')!.value.toUpperCase(),
        direccion: this.modificaUsuario.get('direccion')!.value.toUpperCase(),
        usuarioCrea_id: this.currentUsuario.usuarioDato.usuario,
        usuarioModifica_id: this.currentUsuario.usuarioDato.usuario

      };

      this.usuarioLabService.putDataUsuario(this.datoUsuario)
      .subscribe(
        dato => {

          if (dato.codigo === 200) {
              Swal.fire(
              'Se Actualizó con Éxito',
              '',
              'success'
            ); // ,

          }else{
            if (dato.codigo!=500){
              Swal.fire(
                dato.mensaje,
                '',
                'error'
              );
            }
            else{
              console.log('Error Usuario:', dato);
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

    // Error handling


    validaRut(control: FormControl): {[s: string]: boolean} {
      // let out1_rut = this.rutService.getRutChile(0, '12514508-6');
      if (validateRut(control.value) === false){
          return {rutInvalido: true};
      }
      return null as any;
    }

    onBlurRutUsuario(event: any){
      const rut = event.target.value;

      if (validateRut(rut) === true){
        this.modificaUsuario.get('rutUsuario')!.setValue(formatRut(rut, RutFormat.DOTS_DASH));
      }
    }

  }
