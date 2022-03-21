import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

//import { RutService } from 'rut-chileno';

import {RutValidator} from 'ng2-rut';
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';

import Swal from 'sweetalert2';
import { ExamenService } from './../../../../servicios/examen.service';
import { IExamen } from './../../../../modelo/examen-interface';
import { AuthenticationService } from './../../../../autentica/_services';
import { JwtResponseI } from './../../../../autentica/_models';

@Component({
  selector: 'app-agrega-examen',
  templateUrl: './agrega-examen.component.html',
  styleUrls: ['./agrega-examen.component.css']
})
export class AgregaExamenComponent implements OnInit {

  form!: FormGroup;
  usuario: string;
  dato!: IExamen;

  currentUsuario!: JwtResponseI;

  constructor(private dialogRef: MatDialogRef<AgregaExamenComponent>,
              @Inject(MAT_DIALOG_DATA) data:any,
              public servicioService: ExamenService,
            //  public rutService: RutService,
              public rutValidator: RutValidator,
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
}

