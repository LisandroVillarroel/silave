import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ClienteService } from '../../../../servicios/cliente.service';
import {ICliente} from '../../../../modelo/cliente-interface';

//import { RutService } from 'rut-chileno';

import {RutValidator} from 'ng2-rut';
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';

import Swal from 'sweetalert2';
import { AuthenticationService } from './../../../../autentica/_services';
import { JwtResponseI } from './../../../../autentica/_models';
import { MenuService } from '@app/servicios/menu.service';

@Component({
  selector: 'app-agrega-cliente',
  templateUrl: './agrega-cliente.component.html',
  styleUrls: ['./agrega-cliente.component.css']
})
export class AgregaClienteComponent implements OnInit {

  form: FormGroup | undefined;
  usuario: string;
  datoCliente: ICliente | undefined;

  currentUsuario!: JwtResponseI;

  tipoEmpresa!:string;
  menu_Id!:string;

  constructor(private dialogRef: MatDialogRef<AgregaClienteComponent>,
              @Inject(MAT_DIALOG_DATA) data:any,
              public servCliente: ClienteService,
              public menuService: MenuService,
              public rutValidator: RutValidator,
              private authenticationService: AuthenticationService
              ) {
                this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
               this.usuario = data.usuario;
               this.getDataMenu();
    }
  ngOnInit() {

  }

    rutCliente = new FormControl('', [Validators.required, this.validaRut]);
    razonSocial = new FormControl('', [Validators.required]);
    nombreFantasia = new FormControl('', [Validators.required]);
    direccion = new FormControl('', [Validators.required]);
    telefono = new FormControl('', [Validators.required]);
    email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);
    nombreContacto = new FormControl('', [Validators.required]);
    emailEnvioExamenCliente = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);

    agregaCliente: FormGroup = new FormGroup({
      rutCliente: this.rutCliente,
      razonSocial: this.razonSocial,
      nombreFantasia: this.nombreFantasia,
      direccion: this.direccion,
      telefono: this.telefono,
      email: this.email,
      nombreContacto: this.nombreContacto,
      emailEnvioExamenCliente: this.emailEnvioExamenCliente

      // address: this.addressFormControl
    });

  getErrorMessage(campo: string){
      if (campo === 'rutCliente'){
          return this.rutCliente.hasError('required') ? 'Debes ingresar Rut' :
          this.rutCliente.hasError('rutInvalido') ? 'Rut Inválido' : '';
      }
      if (campo === 'razonSocial'){
          return this.razonSocial.hasError('required') ? 'Debes ingresar Razón Social'  : '';
      }
      if (campo === 'nombreFantasia'){
          return this.nombreFantasia.hasError('required') ? 'Debes ingresar Nombre Fantasía' : '';
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
      if (campo === 'nombreContacto'){
        return this.nombreContacto.hasError('required') ? 'Debes ingresar Nombre Contacto' : '';
      }
      if (campo === 'emailEnvioExamenCliente'){
        return this.emailEnvioExamenCliente.hasError('required') ? 'Debes ingresar Email Envío Exámen' : '';
      }
      /* return this.rutEmpresa.hasError('required') ? 'Debes ingresar Rut' :
             this.rutEmpresa.hasError('rutInvalido') ? 'Rut Inválido' :
          this.razonSocial.hasError('required') ? 'Debes ingresar Razón Social' :
          this.nombreFantasia.hasError('required') ? 'Debes ingresar Nombre Fantasía' :
          this.direccion.hasError('required') ? 'Debes ingresar Dirección' :
              '';
            */
      return '';
    }


  validaRut(control: FormControl): {[s: string]: boolean} {
    console.log('uno', control.value);
    // let out1_rut = this.rutService.getRutChile(0, '12514508-6');
    if (validateRut(control.value) === false){
        return {rutInvalido: true};
    }
    return null as any;
  }

  onBlurRutCliente(event: any){
    const rut = event.target.value;

    if (validateRut(rut) === true){
      this.agregaCliente.get('rutCliente')!.setValue(formatRut(rut, RutFormat.DOTS_DASH));
    }
  }

  getDataMenu(){

    this.menuService
    .getDataMenuNombre('Administrador Veterinaria')
    .subscribe(res => {
      console.log('res menu cliente:',res);
      console.log(' res.data.nombreMenu:', res.data.nombreMenu);
      console.log(' res.data.menu_Id:', res.data.menu_Id);
      console.log(' res.data[0].nombreMenu:', res.data[0].nombreMenu);
      console.log(' res.data[0].menu_Id:', res.data[0]._id);
        this.tipoEmpresa= res.data[0].nombreMenu;
        this.menu_Id=res.data[0]._id;

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
    );
  }

  enviar() {
    this.datoCliente = {
      rutCliente: this.agregaCliente.get('rutCliente')!.value.toUpperCase(),
      razonSocial: this.agregaCliente.get('razonSocial')!.value,
      nombreFantasia: this.agregaCliente.get('nombreFantasia')!.value,
      direccion: this.agregaCliente.get('direccion')!.value,
      telefono: this.agregaCliente.get('telefono')!.value,
      email: this.agregaCliente.get('email')!.value,
      nombreContacto: this.agregaCliente.get('nombreContacto')!.value,
      emailEnvioExamenCliente: this.agregaCliente.get('emailEnvioExamenCliente')!.value,
      usuarioCrea_id: this.usuario,
      usuarioModifica_id: this.usuario,
      empresa_Id: this.currentUsuario.usuarioDato.empresa.empresa_Id,
      tipoEmpresa: this.tipoEmpresa,
      menu_Id:this.menu_Id
    };
    console.log('agrega 1:', this.datoCliente);
    this.servCliente.postDataCliente(this.datoCliente)
    .subscribe(
      dato => {
        console.log('respuesta:', dato.codigo);
        if (dato.codigo === 200) {
            Swal.fire(
            'Se agregó con Éxito',
            '',
            'success'
          ); // ,
            this.dialogRef.close(1);
        }else{
          if (dato.codigo!=500){
            Swal.fire(
              dato.mensaje,
              '',
              'error'
            );
          }
          else{
            console.log('Error Cliente:', dato);
            Swal.fire(
              '',
              'ERROR SISTEMA',
              'error'
            );
          }
        }
      }
      // console.log('yo:', res as PerfilI[]),
     /// error => {
     ///   console.log('error agregar:', error);
     /// }
      // this.dialogRef.close(this.form.value);
    // console.log(this.datoCotiza);
    );
  }

  // Error handling


  cerrar() {
    this.dialogRef.close();
  }
}

