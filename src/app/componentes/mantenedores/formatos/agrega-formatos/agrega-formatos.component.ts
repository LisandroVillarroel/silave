import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFormatos } from './../../../../modelo/formatos-interface';
import { FormatosService } from './../../../../servicios/formatos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agrega-formatos',
  templateUrl: './agrega-formatos.component.html',
  styleUrls: ['./agrega-formatos.component.css']
})
export class AgregaFormatosComponent implements OnInit {

  form!: FormGroup;
  usuario: string;
  datoFormatos!: IFormatos;

  constructor(private dialogRef: MatDialogRef<AgregaFormatosComponent>,
              @Inject(MAT_DIALOG_DATA) data:any,
              public servFormatos: FormatosService,
            //  public rutService: RutService,
           //   public rutValidator: RutValidator
              ) {
               this.usuario = data.usuario;
    }

    nombreFormato = new FormControl('', [Validators.required]);
    descripcion = new FormControl('', [Validators.required]);

    agregaFormatos: FormGroup = new FormGroup({
      nombreFormato: this.nombreFormato,
      descripcion: this.descripcion

      // address: this.addressFormControl
    });

    getErrorMessage(campo: string) {
      if (campo === 'nombreFormato'){
          return this.nombreFormato.hasError('required') ? 'Debes ingresar Nombre'  : '';
      }
      if (campo === 'descripcion'){
          return this.descripcion.hasError('required') ? 'Debes ingresar Descripción' : '';
      }

      return '';
    }


  ngOnInit() {
  }

  enviar() {
    this.datoFormatos = {
      nombreFormato: this.agregaFormatos.get('nombreFormato')!.value.toUpperCase(),
      descripcion: this.agregaFormatos.get('descripcion')!.value.toUpperCase(),
      usuarioCrea_id: this.usuario,
      usuarioModifica_id: this.usuario
    };
    console.log('agrega 1:', this.datoFormatos);
    this.servFormatos.postDataFormatos(this.datoFormatos)
    .subscribe(
      dato => {
        console.log('respuesta:', dato);
        if (dato.codigo === 200) {
            Swal.fire(
            'Se agregó con Éxito',
            'Click en Botón!',
            'success'
          ); // ,
            this.dialogRef.close(1);
        }else{
          Swal.fire(
            dato.mensaje,
            'Click en Botón!',
            'error'
          );
          this.dialogRef.close(1);
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

