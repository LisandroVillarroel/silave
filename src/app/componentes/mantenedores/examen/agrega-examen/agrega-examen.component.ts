import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

//import { RutService } from 'rut-chileno';

import {RutValidator} from 'ng2-rut';
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';

import Swal from 'sweetalert2';
import { ExamenService } from './../../../../servicios/examen.service';
import { IExamen, IResultado } from './../../../../modelo/examen-interface';
import { AuthenticationService } from './../../../../autentica/_services';
import { JwtResponseI } from './../../../../autentica/_models';
import { FileHolder } from 'angular2-image-upload';
import { ImagenesService } from '@app/servicios/imagenes.service';
@Component({
  selector: 'app-agrega-examen',
  templateUrl: './agrega-examen.component.html',
  styleUrls: ['./agrega-examen.component.css']
})
export class AgregaExamenComponent implements OnInit {

  form!: FormGroup;
  usuario: string;
  dato!: IExamen;
  resultado!:IResultado;

  currentUsuario!: JwtResponseI;
  imagen64= '';
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

  constructor(private dialogRef: MatDialogRef<AgregaExamenComponent>,
              @Inject(MAT_DIALOG_DATA) data:any,
              private servicioService: ExamenService,
              private imagenesService: ImagenesService,
              private authenticationService: AuthenticationService
              ) {

                this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
               this.usuario = data.usuario;
    }

    codigoExamen = new FormControl('', [Validators.required]);
    nombre = new FormControl('', [Validators.required]);
    sigla = new FormControl('', [Validators.required]);
    precio = new FormControl('', [Validators.required]);
    codigoInterno = new FormControl('', [Validators.required]);

    agregaExamen: FormGroup = new FormGroup({
      codigoExamen: this.codigoExamen,
      nombre: this.nombre,
      sigla: this.sigla,
      precio: this.precio,
      codigoInterno: this.codigoInterno

      // address: this.addressFormControl
    });

    getErrorMessage(campo: string) {

      if (campo === 'codigoExamen'){
          return this.codigoExamen.hasError('required') ? 'Debes ingresar Código Exámen' : '';
      }
      if (campo === 'codigoInterno'){
        return this.codigoInterno.hasError('required') ? 'Debes ingresar Codigo Interno' : '';
      }
      if (campo === 'nombre'){
          return this.nombre.hasError('required') ? 'Debes ingresar Nombre'  : '';
      }
      if (campo === 'sigla'){
          return this.sigla.hasError('required') ? 'Debes ingresar Sigla' : '';
      }
      if (campo === 'precio'){
        return this.precio.hasError('required') ? 'Debes ingresar Precio' : '';
      }


      return '';
    }


  ngOnInit() {
  }

  enviar() {
    this.dato = {
      codigoExamen: this.agregaExamen.get('codigoExamen')!.value,
      codigoInterno: this.agregaExamen.get('codigoInterno')!.value,
      nombre: this.agregaExamen.get('nombre')!.value,
      sigla: this.agregaExamen.get('sigla')!.value,
      precio: this.agregaExamen.get('precio')!.value,
      nombreExamen: this.archivo.nombreArchivo,
      usuarioCrea_id: this.usuario,
      usuarioModifica_id: this.usuario,
      empresa_Id: this.currentUsuario.usuarioDato.empresa.empresa_Id
    };
    console.log('agrega 1:', this.dato);
    this.servicioService.postDataExamen(this.dato)
    .subscribe(
      dato => {
        console.log('respuesta:', dato);
        console.log('respuesta:', dato.mensaje);
        if (dato.codigo === 200) {
          console.log('entro if 200',this.archivo);
          this.imagenesService.uploadFile(this.archivo)
          .subscribe({
            next: (datos) => {
              console.log('antes de grabar imagen:',datos);
              if(datos.resultado === 'OK') {
                console.log('grabó imagen');
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
        }) ,
            Swal.fire(
            'Se agregó con Éxito',
            'Click en Boton!',
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
            console.log('Error Exámen:', dato);
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
  cerrar() {
    this.dialogRef.close();
  }

  onUploadFinished(file: FileHolder) {
    console.log('paso1:', file);
    console.log('muestra base64: ', file.src)
    this.imagen64= file.src;
    this.archivo.base64textString=file.src;
    this.archivo.nombreArchivo=file.file.name;
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
}

