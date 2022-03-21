import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRaza } from './../../../../modelo/raza-interface';
import { RazaService } from './../../../../servicios/raza.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-elimina-raza',
  templateUrl: './elimina-raza.component.html',
  styleUrls: ['./elimina-raza.component.css']
})
export class EliminaRazaComponent implements OnInit {

    datoPar: IRaza;
    dat!: IRaza;

    constructor(private dialogRef: MatDialogRef<EliminaRazaComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
                public razaService: RazaService
      ) {this.datoPar = data; }

    ngOnInit(): void {
    }

    enviar() {

      console.log('elimina:',this.datoPar);
      this.razaService.deleteDataRaza(this.datoPar)
      .subscribe(
        dato => {
          console.log('respuesta:', dato['codigo']);
          if (dato['codigo'] === 200) {
              Swal.fire(
              'Se ELIMINÓ con Éxito',
              'Click en Botón!',
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
