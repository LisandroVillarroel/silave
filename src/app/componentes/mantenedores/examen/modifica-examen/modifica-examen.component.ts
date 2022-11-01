import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ExamenService } from './../../../../servicios/examen.service';
import { IExamen } from '../../../../modelo/examen-interface';

import Swal from 'sweetalert2';
import { formatRut, RutFormat, validateRut } from '@fdograph/rut-utilities';
import { FileHolder } from 'angular2-image-upload';
import { AuthenticationService } from '@app/autentica/_services';
import { JwtResponseI } from '@app/autentica/_models';
import { ImagenesService } from '@app/servicios/imagenes.service';

@Component({
  selector: 'app-modifica-examen',
  templateUrl: './modifica-examen.component.html',
  styleUrls: ['./modifica-examen.component.css']
})
export class ModificaExamenComponent implements OnInit {

  form!: UntypedFormGroup;
  currentUsuario!: JwtResponseI;
  // id: string;
  // rutEmpresa: string;
  // razonSocialPar: string;
  // nombreFantasia: string;
  // direccion: string;
  // usuario: string;
  datoPar: IExamen;
  _dato!: IExamen;
  imagen64: any;

  /*imagen = './../../../../../assets/imagenes/';
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
*/
  constructor(private dialogRef: MatDialogRef<ModificaExamenComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private servicioService: ExamenService,
              private imagenesService: ImagenesService,
              private authenticationService:AuthenticationService,
              ) {
                this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
                if (this.authenticationService.getCurrentUser() != null) {
                      this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
                }

                this.datoPar = data;
                console.log('dato update: ', data);
               // this.id = data.id;
               // this.rutEmpresa: data.rutEmpresa;
               // this.razonSocialPar = data.razonSocial;
               // nombreFantasia: string;
               // direccion: string;
               // usuario: string;
  }
  codigoExamen = new UntypedFormControl(this.data.codigoExamen);
  nombre = new UntypedFormControl(this.data.nombre, [Validators.required]);
  sigla = new UntypedFormControl(this.data.sigla, [Validators.required]);
  precio = new UntypedFormControl(this.data.precio, [Validators.required]);

  modifica: UntypedFormGroup = new UntypedFormGroup({
    codigoExamen: this.codigoExamen,
    nombre: this.nombre,
    sigla: this.sigla,
    precio: this.precio,
      // address: this.addressFormControl
    });

    getErrorMessage(campo:any) {
/*      if (campo === 'codigoExamen'){
        return this.codigoExamen.hasError('required') ? 'Debes ingresar Código Exámen' : '';
    }*/
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
  /*
    if (this.data.nombreExamen =='sinFirma.jpg' || this.data.nombreExamen ==''){
      this.imagen=this.imagen+'sinFirma.jpg' // agregar a estructura data.nomreArchivo
    }else{
      this.imagen=this.imagen+ this.currentUsuario.usuarioDato.empresa.rutEmpresa+'/'+this.data.nombreExamen  // agregar a estructura data.nomreArchivo
    }
    */
  }

  enviar() {
   /* console.log('sube archivo:',this.archivo.nombreArchivo)
    let nombreExamen_= this.data.nombreExamen;

    if (this.archivo.nombreArchivo!=''){
        nombreExamen_=this.archivo.nombreArchivo
    }
    */
    this._dato = {
      _id: this.datoPar._id,
      codigoExamen: this.modifica.get('codigoExamen')!.value,
      nombre: this.modifica.get('nombre')!.value,
      sigla: this.modifica.get('sigla')!.value,
      precio: this.modifica.get('precio')!.value,
    //  nombreExamen: nombreExamen_,
      empresa_Id: this.datoPar.empresa_Id,
      usuarioModifica_id: this.datoPar.usuarioModifica_id
    };
    console.log('modifica:', this._dato);
    /*
    this.servicioService.putDataExamen(this._dato)
    .subscribe(
      dato => {
        console.log('respuesta:', dato['codigo']);
        if (dato['codigo'] === 200) {
            Swal.fire(
            'Se grabó con Éxito',
            '',
            'success'
          ),
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
       // error =>{console.log('error agrega:',<any>error);this.errorMsg=error.error.error;alert('Error: ' + this.errorMsg)}
      );
*/
    this.servicioService.putDataExamen(this._dato)
    .subscribe(
      dato => {
        console.log('respuesta:', dato);
        console.log('respuesta:', dato.mensaje);
        if (dato.codigo === 200) {
         
          Swal.fire(
            'Se agregó con Éxito',
            '',
            'success'
          );
          this.dialogRef.close(1);
          /*
          
          if (this.archivo.nombreArchivo!=''){
              this.imagenesService.uploadFile(this.archivo)
              .subscribe({
                next: (datos) => {
                  console.log('antes de grabar imagen:',datos);
                  if(datos.resultado === 'OK') {
                    console.log('grabó imagen');
                    Swal.fire(
                      'Se agregó con Éxito',
                      '',
                      'success'
                    );
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
               // ,
          }else{
                Swal.fire(
                'Se agregó con Éxito',
                '',
                'success'
              );
          }
            this.dialogRef.close(1);
            */
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
      // this.dialogRef.close(this.form.value);
    // console.log(this.datoCotiza);
  }

  // Error handling


/*
  onUploadFinished(file: FileHolder) {
    console.log('paso1:', file);
    console.log('muestra base64: ', file.src)
    console.log('extensión:',file.src.split(';')[0].split('/')[1]);
    this.imagen64= file.src;
    this.archivo.base64textString=file.src;

    this.archivo.nombreArchivo=this.data.codigoInterno+'_firmaExamen.'+file.src.split(';')[0].split('/')[1];
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
*/

}
