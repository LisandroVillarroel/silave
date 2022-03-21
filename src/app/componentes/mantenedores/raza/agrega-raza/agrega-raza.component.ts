
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JwtResponseI } from './../../../../autentica/_models';
import { AuthenticationService } from './../../../../autentica/_services';
import { IRaza } from './../../../../modelo/raza-interface';
import { RazaService } from './../../../../servicios/raza.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-agrega-raza',
  templateUrl: './agrega-raza.component.html',
  styleUrls: ['./agrega-raza.component.css']
})
export class AgregaRazaComponent implements OnInit {


  form!: FormGroup;
  usuario: string;
  dato!: IRaza;

  currentUsuario!: JwtResponseI;

  constructor(private dialogRef: MatDialogRef<AgregaRazaComponent>,
              @Inject(MAT_DIALOG_DATA) data:any,
              private razaService: RazaService,
              private authenticationService: AuthenticationService
              ) {
                this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
               this.usuario = data.usuario;
    }

    nombre = new FormControl('', [Validators.required]);


    agregaRaza: FormGroup = new FormGroup({
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
      nombre: this.agregaRaza.get('nombre')!.value,
      usuarioCrea_id: this.usuario,
      usuarioModifica_id: this.usuario,
      empresa_Id: this.currentUsuario.usuarioDato.empresa.empresa_Id
    };
    console.log('agrega 1:', this.dato);
    this.razaService.postDataRaza(this.dato)
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
            console.log('Error Raza:', dato);
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

