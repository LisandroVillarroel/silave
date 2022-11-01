import { strings } from '@angular-devkit/core';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { IValidador } from '@app/modelo/validador-interface';

import { ImagenesService } from '@app/servicios/imagenes.service';
import { ValidadorService } from '@app/servicios/validador.service';

import { formatRut, RutFormat, validateRut } from '@fdograph/rut-utilities';
import { FileHolder } from 'angular2-image-upload';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agrega-validadores',
  templateUrl: './agrega-validadores.component.html',
  styleUrls: ['./agrega-validadores.component.css']
})
export class AgregaValidadoresComponent implements OnInit {

  currentUsuario!: JwtResponseI;
  datoValidador!: IValidador;
  datoEnviaValidador!: IValidador;

  imagen64: any;

  imagen = './../../../../../assets/imagenes/';
  archivo: {
    nombre: string,
    nombreArchivo: string,
    base64textString: string,
    ruta: string
  } = {
    nombre:'',
    nombreArchivo: '',
    base64textString: '',
    ruta:''
  };

  constructor(private dialogRef: MatDialogRef<AgregaValidadoresComponent>,
              private authenticationService:AuthenticationService,
              private validadorService: ValidadorService,

              private imagenesService:ImagenesService) {


    this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
    if (this.authenticationService.getCurrentUser() != null) {
          this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
    }
    //Carga Menu
    /*
    this.dataSource.data = this.data.MenuItem; //TREE_DATA;
    Object.keys(this.dataSource.data).forEach(x => {
      this.setParent(this.dataSource.data[x as any], null);
    });
    */
    //Fin Carga Menu
  }

  rutValidador = new UntypedFormControl('', [Validators.required, this.validaRut]);
  nombres = new UntypedFormControl('', [Validators.required]);
  apellidoPaterno = new UntypedFormControl('', [Validators.required]);
  apellidoMaterno = new UntypedFormControl('', [Validators.required]);
  profesion = new UntypedFormControl('', [Validators.required]);
  telefono = new UntypedFormControl('', [Validators.required]);


  agregaValidador : UntypedFormGroup = new UntypedFormGroup({
    rutValidador: this.rutValidador,
    nombres: this.nombres,
    apellidoPaterno: this.apellidoPaterno,
    apellidoMaterno: this.apellidoMaterno,
    telefono: this.telefono,
    profesion: this.profesion
  });


  getErrorMessage(campo: string){

    if (campo === 'rutValidador'){
      return this.rutValidador.hasError('required') ? 'Debes ingresar Rut' :
      this.rutValidador.hasError('rutInvalido') ? 'Rut Inválido' : '';
    }
    if (campo === 'nombres'){
        return this.nombres.hasError('required') ? 'Debes ingresar Nombres' :'';
    }
    if (campo === 'apellidoPaterno'){
        return this.apellidoPaterno.hasError('required') ? 'Debes ingresar Apellido Paterno'  : '';
    }
    if (campo === 'apellidoMaterno'){
        return this.apellidoMaterno.hasError('required') ? 'Debes ingresar Apellido Materno' : '';
    }
    if (campo === 'telefono'){
        return this.telefono.hasError('required') ? 'Debes ingresar telefono' : '';
    }
    if (campo === 'profesion'){
      return this.profesion.hasError('required') ? 'Debes ingresar Profesión' : '';
    }
    return '';
  }

  ngOnInit() {

  }



  async enviar(){

    let nombreFirma;
    if(this.archivo.nombreArchivo==""){
      nombreFirma='sinFirma.jpg';
    }else{
      nombreFirma=this.archivo.nombreArchivo;
    }

    this.datoEnviaValidador = {
      rutValidador: this.agregaValidador.get('rutValidador')!.value.toUpperCase(),
      nombres: this.agregaValidador.get('nombres')!.value,
      apellidoPaterno: this.agregaValidador.get('apellidoPaterno')!.value,
      apellidoMaterno: this.agregaValidador.get('apellidoMaterno')!.value,
      telefono: this.agregaValidador.get('telefono')!.value,
      profesion: this.agregaValidador.get('profesion')!.value,
      nombreFirma: nombreFirma,
      empresa_Id: this.currentUsuario.usuarioDato.empresa.empresa_Id,
      usuarioCrea_id: this.currentUsuario.usuarioDato._id,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id,

    };

    this.validadorService.postDataValidador(this.datoEnviaValidador)
      .subscribe(
        dato => {
          console.log('paso1:',dato);
          let resultadoEmpresa:any;

          if (dato.codigo === 200) {
            console.log('paso2:',dato);
            this.agregaFirmaValidador();

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

  agregaFirmaValidador(){
    this.imagenesService.uploadFile(this.archivo)
    .subscribe({
      next: (datos) => {
        console.log('antes de grabar imagen:',datos);
        if(datos.resultado === 'OK') {
          Swal.fire(
            'Se agregó con Éxito',
            '',
            'success'
          ); // ,
          this.dialogRef.close(1);
        }
      },
      error: (error) => {
        console.log('error carga:', error);
        Swal.fire(
          'ERROR INESPERADO',
          error,
        'error'
      );
      }
  })
  }



  validaRut(control: UntypedFormControl): {[s: string]: boolean} {
    // let out1_rut = this.rutService.getRutChile(0, '12514508-6');
    if (validateRut(control.value) === false){
        return {rutInvalido: true};
    }
    return null as any;
  }

  onBlurRutUsuario(event: any){
    const rut = event.target.value;

    if (validateRut(rut) === true){
      this.agregaValidador.get('rutValidador')!.setValue(formatRut(rut, RutFormat.DOTS_DASH));
    }
  }

  onUploadFinished(file: FileHolder) {
    console.log('paso1:', file);
    console.log('muestra base64: ', file.src)
    this.imagen64= file.src;
    this.archivo.base64textString=file.src;
    this.archivo.nombreArchivo='fimaValidador_'+this.agregaValidador.get('rutValidador')!.value.toUpperCase()+'.'+file.src.split(';')[0].split('/')[1];
    this.archivo.ruta=this.currentUsuario.usuarioDato.empresa.rutEmpresa;
  }

  onRemoved(file: FileHolder) {
    console.log('paso2: ', file);
    this.imagen64= '';
    this.archivo.base64textString='';
    this.archivo.nombreArchivo='';
    this.archivo.ruta='';
  }

  onUploadStateChanged(state: boolean) {
    console.log('paso3: ', state);
  }

  comparaEstadoUsuario(v1: any, v2: any): boolean {
    return  v1.toUpperCase()===v2.toUpperCase();
  }
}
