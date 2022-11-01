import { IClienteEmpresa, IEmailCliente } from './../../../../modelo/cliente-interface';
import { Component, OnInit, Inject, ViewChild, Renderer2 } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
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

  form: UntypedFormGroup | undefined;
  usuario: string;
  datoCliente: ICliente | undefined;
  clienteEmpresa!: IClienteEmpresa[];
  currentUsuario!: JwtResponseI;
  clienteEmpresa_!: IClienteEmpresa;

  clienteEmpresaRescata!: IClienteEmpresa[];
  datoClienteRescata: ICliente | undefined;
  datoEnviaCorreo!: IEmailCliente;

  tipoEmpresa!:string;
  menu_Id!:string;
  _idBusca!:string;
  rutClienteBusca!:string;
  constructor(private dialogRef: MatDialogRef<AgregaClienteComponent>,
              private renderer: Renderer2,
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

    rutCliente = new UntypedFormControl('', [Validators.required, this.validaRut]);
    razonSocial = new UntypedFormControl('', [Validators.required]);
    nombreFantasia = new UntypedFormControl('', [Validators.required]);
    direccion = new UntypedFormControl('', [Validators.required]);
    telefono = new UntypedFormControl('', [Validators.required]);
    email = new UntypedFormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);
    nombreContacto = new UntypedFormControl('', [Validators.required]);
    emailRecepcionExamenCliente = new UntypedFormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);

    /*emailEnvio = new UntypedFormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);
    password = new UntypedFormControl('', [Validators.required]);*/
    nombreDesde = new UntypedFormControl('', [Validators.required]);
    asunto = new UntypedFormControl('', [Validators.required]);
    tituloCuerpo = new UntypedFormControl('', [Validators.required]);
    tituloCuerpoMedio = new UntypedFormControl('', [Validators.required]);
    tituloCuerpoPie = new UntypedFormControl('', [Validators.required]);


    agregaCliente: UntypedFormGroup = new UntypedFormGroup({
      rutCliente: this.rutCliente,
      razonSocial: this.razonSocial,
      nombreFantasia: this.nombreFantasia,
      direccion: this.direccion,
      telefono: this.telefono,
      email: this.email,
      nombreContacto: this.nombreContacto,
      emailRecepcionExamenCliente: this.emailRecepcionExamenCliente,

     /* emailEnvio: this.emailEnvio,
      password: this.password,*/
      nombreDesde: this.nombreDesde,
      asunto: this.asunto,
      tituloCuerpo: this.tituloCuerpo,
      tituloCuerpoMedio: this.tituloCuerpoMedio,
      tituloCuerpoPie: this.tituloCuerpoPie

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
      if (campo === 'emailRecepcionExamenCliente'){
        return this.emailRecepcionExamenCliente.hasError('required') ? 'Debes ingresar Email Envío Exámen' : '';
      }

/*
      if (campo === 'emailEnvio'){
        return this.emailEnvio.hasError('required') ? 'Debes ingresar Email Envio' : '';
      }
      if (campo === 'password'){
        return this.password.hasError('required') ? 'Debes ingresar Password' : '';
      }
      */
      if (campo === 'nombreDesde'){
        return this.nombreDesde.hasError('required') ? 'Debes ingresar Nombre Desde' : '';
      }
      if (campo === 'asunto'){
        return this.asunto.hasError('required') ? 'Debes ingresar Asunto' : '';
      }
      if (campo === 'tituloCuerpo'){
        return this.tituloCuerpo.hasError('required') ? 'Debes ingresar Título Cuerpo' : '';
      }
      if (campo === 'tituloCuerpoMedio'){
        return this.tituloCuerpoMedio.hasError('required') ? 'Debes ingresar Título Cuerpo Medio' : '';
      }
      if (campo === 'tituloCuerpoPie'){
        return this.tituloCuerpoPie.hasError('required') ? 'Debes ingresar título Cuerpo Pie' : '';
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


  validaRut(control: UntypedFormControl): {[s: string]: boolean} {
    console.log('uno', control.value);
    // let out1_rut = this.rutService.getRutChile(0, '12514508-6');
    if (validateRut(control.value) === false){
        return {rutInvalido: true};
    }
    return null as any;
  }

  async onBlurRutCliente(event: any){
    const rut = event.target.value;

    if (validateRut(rut) === true){
      await this.agregaCliente.get('rutCliente')!.setValue(formatRut(rut, RutFormat.DOTS_DASH));
      await this.BuscaRut(formatRut(rut, RutFormat.DOTS_DASH))
    }
  }


  async BuscaRut(rutCliente: string){

    this.servCliente
    .getDataClientePorRut(rutCliente)
    .subscribe(res => {
      console.log(' res:', res);
      console.log(' res.data[0]:', res.data[0]);
      console.log(' res.data[0].empresa[0]:', res.data[0].empresa[0]);
      if (res.data[0]!=undefined){
        this.clienteEmpresaRescata=res.data[0].empresa;
        this.datoClienteRescata=res.data[0];

        this.datoEnviaCorreo=res.data[0].envioEmail;
        //this._idBusca=res.data[0]._id;
       // this.rutClienteBusca=res.data[0].rutCliente;
        if (res.data[0].empresa.empresa_Id==this.currentUsuario.usuarioDato.empresa.empresa_Id){

          this.agregaCliente.get('rutCliente')!.setValue('');
          Swal.fire(
            'El Cliente ya Existe en la lista',
            '',
            'error'
          ); // ,
        }else{
          Swal.fire({
            title: `El Cliente existe en los registros, <br> << Lo Desea Incorporar >>?`,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Incorporar',
            denyButtonText: ``,
            cancelButtonText: `Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

              this.enviarExiste();

              this.dialogRef.close(1);
            } else {
            //  Swal.fire('Changes are not saved', '', 'info')
              this.agregaCliente.get('rutCliente')!.setValue('');

            }
          })
        }
      }

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

  getDataMenu(){

    this.menuService
    .getDataMenuNombre('Veterinaria')
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

  enviarExiste() {

    this.clienteEmpresa_ = {
      empresa_Id: this.currentUsuario.usuarioDato.empresa.empresa_Id,
      rutCliente: this.clienteEmpresaRescata![0].rutCliente,
      razonSocial: this.clienteEmpresaRescata![0].razonSocial,
      nombreFantasia: this.clienteEmpresaRescata![0].nombreFantasia,
      direccion: this.clienteEmpresaRescata![0].direccion,
      telefono: this.clienteEmpresaRescata![0].telefono,
      email: this.clienteEmpresaRescata![0].email,
      nombreContacto: this.clienteEmpresaRescata![0].nombreContacto,
      envioEmail:this.datoEnviaCorreo,
      usuarioCrea_id: this.usuario,
      usuarioModifica_id: this.usuario,
      menu_Id:this.menu_Id
    };
    this.clienteEmpresaRescata.push(this.clienteEmpresa_);

    this.datoCliente = {
      _id: this.datoClienteRescata!._id, //this._idBusca,
      rutCliente: this.datoClienteRescata!.rutCliente,// this.rutClienteBusca,
/*
      razonSocial: this.datoClienteRescata!.razonSocial,
      nombreFantasia: this.datoClienteRescata!.nombreFantasia,
      direccion: this.datoClienteRescata!.direccion,
      telefono: this.datoClienteRescata!.telefono,
      usuarioCrea_id: this.datoClienteRescata!.usuarioCrea_id,
      */
      usuarioModifica_id: this.usuario,

      empresa: this.clienteEmpresaRescata,
      emailRecepcionExamenCliente: this.datoClienteRescata!.emailRecepcionExamenCliente,
      //tipoEmpresa: this.datoClienteRescata!.tipoEmpresa
    };
    console.log('agrega 1:', this.datoCliente);

    this.servCliente.putDataCliente(this.datoCliente)
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
      },


      error => {
        console.log('error carga:', error);
        Swal.fire(
          'ERROR INESPERADO',
          error,
        'error'
      );
      }
    )

  }

  enviar() {

    this.datoEnviaCorreo={
      //emailEnvio: this.agregaCliente.get('emailEnvio')!.value,
      //password: this.agregaCliente.get('password')!.value,
      nombreDesde: this.agregaCliente.get('nombreDesde')!.value,
      asunto: this.agregaCliente.get('asunto')!.value,
      tituloCuerpo: this.agregaCliente.get('tituloCuerpo')!.value,
      tituloCuerpoMedio: this.agregaCliente.get('tituloCuerpoMedio')!.value,
      tituloCuerpoPie: this.agregaCliente.get('tituloCuerpoPie')!.value
    }

    this.clienteEmpresa = [{
      empresa_Id: this.currentUsuario.usuarioDato.empresa.empresa_Id,
       rutCliente: this.agregaCliente.get('rutCliente')!.value.toUpperCase(),
      razonSocial: this.agregaCliente.get('razonSocial')!.value,
      nombreFantasia: this.agregaCliente.get('nombreFantasia')!.value,
      direccion: this.agregaCliente.get('direccion')!.value,
      telefono: this.agregaCliente.get('telefono')!.value,
      email: this.agregaCliente.get('email')!.value,
      nombreContacto: this.agregaCliente.get('nombreContacto')!.value,
      envioEmail: this.datoEnviaCorreo,
      usuarioCrea_id: this.usuario,
      usuarioModifica_id: this.usuario,
      menu_Id:this.menu_Id
    }];

    this.datoCliente = {
      rutCliente: this.agregaCliente.get('rutCliente')!.value.toUpperCase(),
      razonSocial: this.agregaCliente.get('razonSocial')!.value,
      nombreFantasia: this.agregaCliente.get('nombreFantasia')!.value,
      direccion: this.agregaCliente.get('direccion')!.value,
      telefono: this.agregaCliente.get('telefono')!.value,
      usuarioCrea_id: this.usuario,
      usuarioModifica_id: this.usuario,
      empresa: this.clienteEmpresa,
      tipoEmpresa: this.tipoEmpresa,
      emailRecepcionExamenCliente: this.agregaCliente.get('emailRecepcionExamenCliente')!.value
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
      },


      error => {
        console.log('error carga:', error);
        Swal.fire(
          'ERROR INESPERADO',
          error,
        'error'
      );
      }
    )
  }

}

