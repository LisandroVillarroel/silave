import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDoctorSolicitante } from '@app/modelo/doctorSolicitante-interface';
import { DoctorSolicitanteService } from '@app/servicios/doctor-solicitante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-elimina-doctor-solicitante',
  templateUrl: './elimina-doctor-solicitante.component.html',
  styleUrls: ['./elimina-doctor-solicitante.component.css']
})
export class EliminaDoctorSolicitanteComponent implements OnInit {


    datoPar: IDoctorSolicitante;
    dato!: IDoctorSolicitante;

    constructor(private dialogRef: MatDialogRef<EliminaDoctorSolicitanteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
                public doctorSolicitanteService: DoctorSolicitanteService
      ) {this.datoPar = data; }

    ngOnInit(): void {
    }

    enviar() {

      console.log('elimina:',this.datoPar);
      this.doctorSolicitanteService.deleteDataDoctorSolicitante(this.datoPar)
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
