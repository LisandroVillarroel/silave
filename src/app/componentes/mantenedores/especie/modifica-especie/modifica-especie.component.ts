import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEspecie } from './../../../../modelo/especie-interface';
import { EspecieService } from './../../../../servicios/especie.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-modifica-especie',
  templateUrl: './modifica-especie.component.html',
  styleUrls: ['./modifica-especie.component.css']
})
export class ModificaEspecieComponent implements OnInit {

  form!: FormGroup;

  datoPar: IEspecie;
  _dato!: IEspecie;

  constructor(private dialogRef: MatDialogRef<ModificaEspecieComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public especieService: EspecieService
              ) {
                this.datoPar = data;
                console.log('dato update: ', data);
  }
  nombre = new FormControl(this.data.nombre, [Validators.required]);

  modifica: FormGroup = new FormGroup({
    nombre: this.nombre
    });

    getErrorMessage(campo:any) {

    if (campo === 'nombre'){
        return this.nombre.hasError('required') ? 'Debes ingresar Nombre'  : '';
    }

    return '';
    }

  ngOnInit() {
  }

  enviar() {
    this._dato = {
      _id: this.datoPar._id,
      nombre: this.modifica.get('nombre')!.value,
      usuarioModifica_id: this.datoPar.usuarioModifica_id
    };
    console.log('modifica:', this._dato);
    this.especieService.putDataEspecie(this._dato,this.datoPar.nombre)
    .subscribe(
      dato => {
        console.log('respuesta:', dato['codigo']);
        if (dato['codigo'] === 200) {
            Swal.fire(
            'Se grabó con Éxito',
            'Click en Botón!',
            'success'
          ),
          this.dialogRef.close(1);
        }else{
          Swal.fire(
            dato.mensaje,
            'Click en Botón!',
            'error'
          );


        }
      }
       // error =>{console.log('error agrega:',<any>error);this.errorMsg=error.error.error;alert('Error: ' + this.errorMsg)}
      );
      // this.dialogRef.close(this.form.value);
    // console.log(this.datoCotiza);
  }

}
