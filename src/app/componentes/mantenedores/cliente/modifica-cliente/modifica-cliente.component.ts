import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ClienteService } from './../../../../servicios/cliente.service';
import { ICliente } from '../../../../modelo/cliente-interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifica-cliente',
  templateUrl: './modifica-cliente.component.html',
  styleUrls: ['./modifica-cliente.component.css']
})
export class ModificaClienteComponent implements OnInit {

  form!: FormGroup;

  // id: string;
  // rutEmpresa: string;
  // razonSocialPar: string;
  // nombreFantasia: string;
  // direccion: string;
  // usuario: string;
  datoClientePar: ICliente;
  datoCliente!: ICliente;

  constructor(private dialogRef: MatDialogRef<ModificaClienteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public servCliente: ClienteService
              ) {
                this.datoClientePar = data;
                console.log('dato update: ', data);
               // this.id = data.id;
               // this.rutEmpresa: data.rutEmpresa;
               // this.razonSocialPar = data.razonSocial;
               // nombreFantasia: string;
               // direccion: string;
               // usuario: string;
  }

    razonSocial = new FormControl(this.data.razonSocial, [Validators.required]);
    nombreFantasia = new FormControl(this.data.nombreFantasia, [Validators.required]);
    direccion = new FormControl(this.data.direccion, [Validators.required]);
    telefono = new FormControl(this.data.telefono, [Validators.required]);
    email = new FormControl(this.data.email, [Validators.required]);
    nombreContacto = new FormControl(this.data.nombreContacto, [Validators.required]);

    modificaCliente: FormGroup = new FormGroup({
      // rutEmpresa: this.datoEmpresaPar.rutEmpresa,
      razonSocial: this.razonSocial,
      nombreFantasia: this.nombreFantasia,
      direccion: this.direccion,
      telefono: this.telefono,
      email: this.email,
      nombreContacto: this.nombreContacto
      // address: this.addressFormControl
    });

    getErrorMessage() {
      return this.razonSocial.hasError('required') ? 'Debes ingresar Razón Social' :
          this.nombreFantasia.hasError('required') ? 'Debes ingresar Nombre Fantasía' :
          this.direccion.hasError('required') ? 'Debes ingresar Dirección' :
          this.telefono.hasError('required') ? 'Debes ingresar Teléfono' :
          this.email.hasError('required') ? 'Debes ingresar Email' :
          this.nombreContacto.hasError('required') ? 'Debes ingresar Nombre Contacto' :
              '';
    }

  ngOnInit() {
  }

  enviar() {
    this.datoCliente = {
      _id: this.datoClientePar._id,
      rutCliente: this.datoClientePar.rutCliente,
      razonSocial: this.modificaCliente.get('razonSocial')!.value.toUpperCase(),
      nombreFantasia: this.modificaCliente.get('nombreFantasia')!.value.toUpperCase(),
      direccion: this.modificaCliente.get('direccion')!.value.toUpperCase(),
      telefono: this.modificaCliente.get('telefono')!.value,
      email: this.modificaCliente.get('email')!.value.toUpperCase(),
      nombreContacto: this.modificaCliente.get('nombreContacto')!.value.toUpperCase(),
    //  usuarioCrea_id: this.datoEmpresaPar.usuarioCrea_id,
      usuarioModifica_id: this.datoClientePar.usuarioModifica_id
    };

    this.servCliente.putDataCliente(this.datoCliente)
    .subscribe(
      dato => {
        console.log('respuesta:', dato['codigo']);
        if (dato['codigo'] === 200) {
            Swal.fire(
            'Ya se agrego con Exito',
            'Click en Boton!',
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
            console.log('Error Cliente:', dato);
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
      // this.dialogRef.close(this.form.value);
    // console.log(this.datoCotiza);
  }

  // Error handling


  cerrar() {
    this.dialogRef.close();
  }

}
