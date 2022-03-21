import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ExamenService } from './../../../../servicios/examen.service';
import { IExamen } from '../../../../modelo/examen-interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-elimina-examen',
  templateUrl: './elimina-examen.component.html',
  styleUrls: ['./elimina-examen.component.css']
})
export class EliminaExamenComponent implements OnInit {

  datoPar: IExamen;
  dato!: IExamen;

  constructor(private dialogRef: MatDialogRef<EliminaExamenComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public servicioService: ExamenService
    ) {this.datoPar = data; }

  ngOnInit(): void {
  }

  enviar() {
    /*
    this.dato = {
      _id: this.datoPar._id,
      rutPropietario: this.datoPar.rutPropietario,
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      region: '',
      comuna: '',
      direccion: '',
      telefono: '',
      email: '',
      usuarioModifica_id: this.datoPar.usuarioModifica_id
    };
*/
    console.log('elimina:',this.datoPar);
    this.servicioService.deleteDataExamen(this.datoPar)
    .subscribe(
      dato => {
        console.log('respuesta:', dato['codigo']);
        if (dato['codigo'] === 200) {
            Swal.fire(
            'Se ELIMINÓ con Exito',
            'Click en Boton!',
            'success'
          ),
          this.dialogRef.close(1);
        }
        else{
          console.log('error', dato);
        }
      }
       // error =>{console.log('error agrega:',<any>error);this.errorMsg=error.error.error;alert('Error: ' + this.errorMsg)}
      );

  }

  cerrar() {
    this.dialogRef.close();
  }
}
