import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { IEspecie } from './../../../../modelo/especie-interface';
import { EspecieService } from './../../../../servicios/especie.service';
import { JwtResponseI } from './../../../../autentica/_models';
import { AuthenticationService } from './../../../../autentica/_services';


@Component({
  selector: 'app-agrega-especie',
  templateUrl: './agrega-especie.component.html',
  styleUrls: ['./agrega-especie.component.css']
})
export class AgregaEspecieComponent implements OnInit {

  form!: FormGroup;
  usuario: string;
  dato!: IEspecie;

  currentUsuario!: JwtResponseI;

  constructor(private dialogRef: MatDialogRef<AgregaEspecieComponent>,
              @Inject(MAT_DIALOG_DATA) data:any,
              private especieService: EspecieService,
              private authenticationService: AuthenticationService
              ) {
                this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
               this.usuario = data.usuario;
    }

    nombre = new FormControl('', [Validators.required]);


    agregaEspecie: FormGroup = new FormGroup({
      nombre: this.nombre
    });

    getErrorMessage(campo: string) {

      if (campo === 'nombre'){
          return this.nombre.hasError('required') ? 'Debes ingresar Nombre'  : '';
      }

      return '';
    }


  ngOnInit() {
  }

  enviar() {
    this.dato = {
      nombre: this.agregaEspecie.get('nombre')!.value,
      usuarioCrea_id: this.usuario,
      usuarioModifica_id: this.usuario,
      empresa_Id: this.currentUsuario.usuarioDato.empresa.empresa_Id
    };
    console.log('agrega 1:', this.dato);
    this.especieService.postDataEspecie(this.dato)
    .subscribe(
      dato => {
        console.log('respuesta:', dato);
        console.log('respuesta:', dato.mensaje);
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
            console.log('Error Especie:', dato);
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

