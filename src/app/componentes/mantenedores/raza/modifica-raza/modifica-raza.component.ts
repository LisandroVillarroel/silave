import { IEspecie } from './../../../../modelo/especie-interface';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRaza } from './../../../../modelo/raza-interface';
import { RazaService } from './../../../../servicios/raza.service';
import Swal from 'sweetalert2';
import { EspecieService } from '@app/servicios/especie.service';

@Component({
  selector: 'app-modifica-raza',
  templateUrl: './modifica-raza.component.html',
  styleUrls: ['./modifica-raza.component.css']
})
export class ModificaRazaComponent implements OnInit {

    form!: FormGroup;


    _dato!: IRaza;
    datoEspecie!:IEspecie[];

    constructor(private dialogRef: MatDialogRef<ModificaRazaComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private especieService: EspecieService,
                public razaService: RazaService
                ) {

                  console.log('dato update: ', data.razaPar.especieNombre);
                  this.cargaEspecie(data);
    }

    idEspecie= new FormControl(this.data.razaPar.especieNombre, [Validators.required]);
    nombre = new FormControl(this.data.razaPar.nombre, [Validators.required]);

    modifica: FormGroup = new FormGroup({
      idEspecie: this.idEspecie,
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

    cargaEspecie(dataRaza:any){
      console.log('data raza:',dataRaza.razaPar)
      this.especieService
      .getDataEspecieTodo(dataRaza.razaPar.empresa_Id)
      .subscribe(res => {
        console.log('especie:', res['data'])
        this.datoEspecie = res['data'] ;
      },
      // console.log('yo:', res as PerfilI[]),
      error => {
        console.log('error carga:', error);
       Swal.fire(
        'ERROR INESPERADO',
        error,
       'error'
      );
      }
    ); // (this.dataSource.data = res as PerfilI[])
    }

    enviar() {
      console.log('especieeee:',this.modifica.get('idEspecie')!.value);
      let especieNombre_: string
      if (this.modifica.get('idEspecie')!.value._id==undefined){
        especieNombre_=this.data.razaPar.especieNombre
      }else{
        especieNombre_=this.modifica.get('idEspecie')!.value.nombre
      }

      this._dato = {
        _id: this.data.razaPar._id,
        especieNombre: especieNombre_,
        nombre: this.modifica.get('nombre')!.value,
        usuarioModifica_id: this.data.usuarioModifica_id
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

          }
        }
         // error =>{console.log('error agrega:',<any>error);this.errorMsg=error.error.error;alert('Error: ' + this.errorMsg)}
        );
        // this.dialogRef.close(this.form.value);
      // console.log(this.datoCotiza);
    }

    // Error handling


    comparaSeleccionaEspecie(v1: any, v2: any): boolean {
      console.log('v1:',v1.nombre);
      console.log('v2:',v2);
      return v1.nombre===v2;
    }

  }
