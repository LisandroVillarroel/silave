import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { PropietarioService } from '../../../../servicios/propietario.service';
import { IPropietario } from '../../../../modelo/propietario-interface';

import Swal from 'sweetalert2';
import { formatRut, RutFormat, validateRut } from '@fdograph/rut-utilities';

@Component({
  selector: 'app-modifica-propietario',
  templateUrl: './modifica-propietario.component.html',
  styleUrls: ['./modifica-propietario.component.css']
})
export class ModificaPropietarioComponent implements OnInit {

  form!: UntypedFormGroup;

  // id: string;
  // rutEmpresa: string;
  // razonSocialPar: string;
  // nombreFantasia: string;
  // direccion: string;
  // usuario: string;
  datoPar: IPropietario;
  // tslint:disable-next-line: variable-name
  _dato!: IPropietario;

  constructor(private dialogRef: MatDialogRef<ModificaPropietarioComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public servicioService: PropietarioService
              ) {
                this.datoPar = data;
                console.log('dato update: ', data);
               // this.id = data.id;
               // this.rutEmpresa: data.rutEmpresa;
               // this.razonSocialPar = data.razonSocial;
               // nombreFantasia: string;
               // direccion: string;
               // usuario: string;
  }
    rutPropietario = new UntypedFormControl(this.data.rutPropietario, [Validators.required]);
    nombres = new UntypedFormControl(this.data.nombres, [Validators.required]);
    apellidoPaterno = new UntypedFormControl(this.data.apellidoPaterno, [Validators.required]);
    apellidoMaterno = new UntypedFormControl(this.data.apellidoMaterno, [Validators.required]);
    direccion = new UntypedFormControl(this.data.direccion, [Validators.required]);
    telefono = new UntypedFormControl(this.data.telefono, [Validators.required]);
    email = new UntypedFormControl(this.data.email, [Validators.required]);

    modificaPropietario: UntypedFormGroup = new UntypedFormGroup({
      rutPropietario: this.rutPropietario,
      nombres: this.nombres,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      direccion: this.direccion,
      telefono: this.telefono,
      email: this.email,
      // address: this.addressFormControl
    });

    /*
    getErrorMessage(campo) {
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

*/
    getErrorMessage() {
      return  this.rutPropietario.hasError('required') ? 'Debes ingresar Rut' :
          this.rutPropietario.hasError('rutInvalido') ? 'Rut Inválido' :
          this.nombres.hasError('required') ? 'Debes ingresar Nombres' :
          this.apellidoPaterno.hasError('required') ? 'Debes ingresar Apellido Paternoi' :
          this.apellidoMaterno.hasError('required') ? 'Debes ingresar Apellido Materno' :
          this.direccion.hasError('required') ? 'Debes ingresar Dirección' :
          this.telefono.hasError('required') ? 'Debes ingresar Teléfono' :
          this.email.hasError('required') ? 'Debes ingresar Email' :
              '';
    }

    validaRut(control: UntypedFormControl): {[s: string]: boolean} {
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
        this.modificaPropietario.get('rutPropietario')!.setValue(formatRut(rut, RutFormat.DOTS_DASH));
      }
    }

  ngOnInit() {
  }

  enviar() {
    this._dato = {
      _id: this.datoPar._id,
      rutPropietario: this.modificaPropietario.get('rutPropietario')!.value.toUpperCase(),
      nombres: this.modificaPropietario.get('nombres')!.value,
      apellidoPaterno: this.modificaPropietario.get('apellidoPaterno')!.value,
      apellidoMaterno: this.modificaPropietario.get('apellidoMaterno')!.value,
      region: 'sin region',
      comuna: 'sin comuna',
      direccion: this.modificaPropietario.get('direccion')!.value,
      telefono: this.modificaPropietario.get('telefono')!.value,
      email: this.modificaPropietario.get('email')!.value,
      usuarioModifica_id: this.datoPar.usuarioModifica_id
    };

    this.servicioService.putDataPropietario(this._dato)
    .subscribe(
      dato => {
        // tslint:disable-next-line: no-string-literal
        console.log('respuesta:', dato['codigo']);
        // tslint:disable-next-line: no-string-literal
        if (dato['codigo'] === 200) {
            Swal.fire(
            'Ya se agrego con Exito',
            'Click en Boton!',
            'success'
          ),
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
       // error =>{console.log('error agrega:',<any>error);this.errorMsg=error.error.error;alert('Error: ' + this.errorMsg)}
      );
      // this.dialogRef.close(this.form.value);
    // console.log(this.datoCotiza);
  }

  // Error handling




}
