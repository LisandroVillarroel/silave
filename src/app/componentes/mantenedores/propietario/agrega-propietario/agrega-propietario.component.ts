import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { PropietarioService } from '../../../../servicios/propietario.service';
import {IPropietario} from '../../../../modelo/propietario-interface';

//import { RutService } from 'rut-chileno';

//import {RutValidator} from 'ng2-rut';
import {RutValidator} from 'ng2-rut';
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-agrega',
  templateUrl: './agrega-propietario.component.html',
  styleUrls: ['./agrega-propietario.component.css']
})
export class AgregaPropietarioComponent implements OnInit {

  form!: FormGroup;
  usuario: string;
  dato!: IPropietario;

  constructor(private dialogRef: MatDialogRef<AgregaPropietarioComponent>,
              @Inject(MAT_DIALOG_DATA) data:any,
              public servicioService: PropietarioService,
          //    public rutService: RutService,
              public rutValidator: RutValidator
              ) {
               this.usuario = data.usuario;
    }

    rutPropietario = new FormControl('', [Validators.required, this.validaRut]);
    nombres = new FormControl('', [Validators.required]);
    apellidoPaterno = new FormControl('', [Validators.required]);
    apellidoMaterno = new FormControl('', [Validators.required]);
    direccion = new FormControl('', [Validators.required]);
    telefono = new FormControl('', [Validators.required]);
    email = new FormControl('', [Validators.required]);

    agrega: FormGroup = new FormGroup({
      rutPropietario: this.rutPropietario,
      nombres: this.nombres,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      direccion: this.direccion,
      telefono: this.telefono,
      email: this.email,


      // address: this.addressFormControl
    });

    getErrorMessage(campo: string) {
      if (campo === 'rutPropietario'){
          return this.rutPropietario.hasError('required') ? 'Debes ingresar Rut' :
        this.rutPropietario.hasError('rutInvalido') ? 'Rut Inválido' : '';
      }
      if (campo === 'nombres'){
          return this.nombres.hasError('required') ? 'Debes ingresar Nombres'  : '';
      }
      if (campo === 'apellidoPaterno'){
          return this.apellidoPaterno.hasError('required') ? 'Debes ingresar Apellido Paterno' : '';
      }
      if (campo === 'apellidoMaterno'){
        return this.apellidoMaterno.hasError('required') ? 'Debes ingresar Apellido Materno' : '';
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

  onBlurRut(event: any){
    const rut = event.target.value;

    if (validateRut(rut) === true){
      this.agrega.get('rutPropietario')!.setValue(formatRut(rut, RutFormat.DOTS_DASH));
    }
  }

  ngOnInit() {
  }

  enviar() {
    this.dato = {
      rutPropietario: this.agrega.get('rutPropietario')!.value.toUpperCase(),
      nombres: this.agrega.get('nombres')!.value,
      apellidoPaterno: this.agrega.get('apellidoPaterno')!.value,
      apellidoMaterno: this.agrega.get('apellidoMaterno')!.value,
      region: 'Sin Region',
      comuna: 'Sin Comuna',
      direccion: this.agrega.get('direccion')!.value,
      telefono: this.agrega.get('telefono')!.value,
      email: this.agrega.get('email')!.value,
      usuarioCrea_id: this.usuario,
      usuarioModifica_id: this.usuario
    };
    console.log('agrega 1:', this.dato);
    this.servicioService.postDataPropietario(this.dato)
    .subscribe(
      dato => {
        console.log('respuesta:', dato.codigo);
        if (dato.codigo === 200) {
            Swal.fire(
            'Ya se agrego con Exito',
            'Click en Boton!',
            'success'
          ); // ,
            this.dialogRef.close(1);
        }else{
          Swal.fire(
            dato.mensaje,
            'Click en Boton!',
            'error'
          );
          this.dialogRef.close(1);
        }
      }
    );
  }
  // Error handling
  cerrar() {
    this.dialogRef.close();
  }
}

