import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEspecie } from './../../../../modelo/especie-interface';
import { EspecieService } from './../../../../servicios/especie.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-elimina-especie',
  templateUrl: './elimina-especie.component.html',
  styleUrls: ['./elimina-especie.component.css']
})
export class EliminaEspecieComponent implements OnInit {

  datoPar: IEspecie;
  dato!: IEspecie;

  constructor(private dialogRef: MatDialogRef<EliminaEspecieComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any,
              public especieService: EspecieService
    ) {this.datoPar = data; }

  ngOnInit(): void {
  }

  enviar() {

    console.log('elimina:',this.datoPar);
    this.especieService.deleteDataEspecie(this.datoPar)
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
