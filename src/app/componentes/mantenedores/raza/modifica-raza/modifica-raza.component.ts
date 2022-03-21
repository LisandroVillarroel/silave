import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRaza } from './../../../../modelo/raza-interface';
import { RazaService } from './../../../../servicios/raza.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifica-raza',
  templateUrl: './modifica-raza.component.html',
  styleUrls: ['./modifica-raza.component.css']
})
export class ModificaRazaComponent implements OnInit {

    form!: FormGroup;

    datoPar: IRaza;
    _dato!: IRaza;

    constructor(private dialogRef: MatDialogRef<ModificaRazaComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public razaService: RazaService
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
      this.razaService.putDataRaza(this._dato)
      .subscribe(
        dato => {
          console.log('respuesta:', dato['codigo']);
          if (dato['codigo'] === 200) {
              Swal.fire(
              'Ya se grabó con Éxito',
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
            this.dialogRef.close(1);

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
